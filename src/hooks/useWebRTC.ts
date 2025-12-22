import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface UseWebRTCProps {
  sessionId: string;
  isInitiator: boolean;
  onRemoteStream?: (stream: MediaStream) => void;
  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
}

export function useWebRTC({ sessionId, isInitiator, onRemoteStream, onConnectionStateChange }: UseWebRTCProps) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connectionState, setConnectionState] = useState<RTCPeerConnectionState>('new');
  const [isConnected, setIsConnected] = useState(false);
  
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const channel = useRef<RealtimeChannel | null>(null);

  // Initialize peer connection
  const initializePeerConnection = useCallback(() => {
    const config: RTCConfiguration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { 
          urls: 'turn:openrelay.metered.ca:80',
          username: 'openrelayproject',
          credential: 'openrelayproject'
        },
        {
          urls: 'turn:openrelay.metered.ca:443',
          username: 'openrelayproject',
          credential: 'openrelayproject'
        },
        {
          urls: 'turn:openrelay.metered.ca:443?transport=tcp',
          username: 'openrelayproject',
          credential: 'openrelayproject'
        }
      ],
      iceCandidatePoolSize: 10,
    };

    const pc = new RTCPeerConnection(config);

    // Handle connection state changes
    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      setConnectionState(state);
      setIsConnected(state === 'connected');
      onConnectionStateChange?.(state);
      console.log('Connection state:', state);
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && channel.current) {
        console.log('Sending ICE candidate');
        channel.current.send({
          type: 'broadcast',
          event: 'ice-candidate',
          payload: { candidate: event.candidate },
        });
      }
    };

    // Handle remote stream
    pc.ontrack = (event) => {
      console.log('Received remote track:', event.streams[0]);
      setRemoteStream(event.streams[0]);
      onRemoteStream?.(event.streams[0]);
    };

    peerConnection.current = pc;
    return pc;
  }, [onRemoteStream, onConnectionStateChange]);

  // Start local stream
  const startLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      setLocalStream(stream);
      
      // Add tracks to peer connection
      if (peerConnection.current) {
        stream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, stream);
        });
      }

      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }, []);

  // Setup Supabase Realtime signaling
  useEffect(() => {
    if (!sessionId) return;

    const pc = initializePeerConnection();
    
    // Create Realtime channel for signaling
    const signalingChannel = supabase.channel(`webrtc-session-${sessionId}`);

    // Handle incoming signals
    signalingChannel
      .on('broadcast', { event: 'offer' }, async ({ payload }) => {
        console.log('Received offer');
        if (!isInitiator && pc.signalingState !== 'stable') {
          await pc.setRemoteDescription(new RTCSessionDescription(payload.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          
          signalingChannel.send({
            type: 'broadcast',
            event: 'answer',
            payload: { answer: pc.localDescription },
          });
        }
      })
      .on('broadcast', { event: 'answer' }, async ({ payload }) => {
        console.log('Received answer');
        if (isInitiator && pc.signalingState !== 'stable') {
          await pc.setRemoteDescription(new RTCSessionDescription(payload.answer));
        }
      })
      .on('broadcast', { event: 'ice-candidate' }, async ({ payload }) => {
        console.log('Received ICE candidate');
        if (payload.candidate && pc.remoteDescription) {
          await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to signaling channel');
          
          // Start local stream
          await startLocalStream();
          
          // If initiator, create and send offer
          if (isInitiator) {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            
            signalingChannel.send({
              type: 'broadcast',
              event: 'offer',
              payload: { offer: pc.localDescription },
            });
            console.log('Sent offer');
          }
        }
      });

    channel.current = signalingChannel;

    return () => {
      // Cleanup
      localStream?.getTracks().forEach((track) => track.stop());
      pc.close();
      signalingChannel.unsubscribe();
    };
  }, [sessionId, isInitiator, initializePeerConnection, startLocalStream]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return !audioTrack.enabled;
      }
    }
    return false;
  }, [localStream]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return !videoTrack.enabled;
      }
    }
    return false;
  }, [localStream]);

  // Disconnect
  const disconnect = useCallback(() => {
    localStream?.getTracks().forEach((track) => track.stop());
    peerConnection.current?.close();
    channel.current?.unsubscribe();
    setLocalStream(null);
    setRemoteStream(null);
    setIsConnected(false);
  }, [localStream]);

  return {
    localStream,
    remoteStream,
    connectionState,
    isConnected,
    toggleMute,
    toggleVideo,
    disconnect,
  };
}
