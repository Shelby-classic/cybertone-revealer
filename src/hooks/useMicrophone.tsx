
import { useState, useEffect, useRef } from 'react';

interface UseMicrophoneReturn {
  isRecording: boolean;
  audioData: Uint8Array | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  audioBlob: Blob | null;
  hasPermission: boolean | null;
  requestPermission: () => Promise<boolean>;
}

export const useMicrophone = (): UseMicrophoneReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  // Request microphone permission
  const requestPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      return true;
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
      setHasPermission(false);
      return false;
    }
  };
  
  // Initialize audio context and analyser
  const initializeAudio = async () => {
    // Create audio context if it doesn't exist
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Create stream
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      
      // Set up analyzer
      const audioContext = audioContextRef.current;
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      const source = audioContext.createMediaStreamSource(streamRef.current);
      source.connect(analyserRef.current);
      
      // Set up media recorder
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        chunksRef.current = [];
      };
      
      return true;
    } catch (error) {
      console.error('Error initializing audio:', error);
      setHasPermission(false);
      return false;
    }
  };
  
  // Update audio data visualization
  const updateAudioData = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    setAudioData(new Uint8Array(dataArrayRef.current));
    
    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(updateAudioData);
    }
  };
  
  // Start recording
  const startRecording = async () => {
    if (isRecording) return;
    
    const initialized = await initializeAudio();
    if (!initialized) return;
    
    // Start recording
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start visualizing audio data
      updateAudioData();
    }
  };
  
  // Stop recording
  const stopRecording = () => {
    if (!isRecording) return;
    
    // Stop media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Stop and release stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsRecording(false);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  return {
    isRecording,
    audioData,
    startRecording,
    stopRecording,
    audioBlob,
    hasPermission,
    requestPermission
  };
};
