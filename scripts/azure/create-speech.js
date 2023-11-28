import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import dotenv from 'dotenv';

dotenv.config();

const audioFile = 'tonic-one-ai-companion.wav';

// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

// The language of the voice that speaks.
speechConfig.speechSynthesisLanguage = "en-US"; 
speechConfig.speechSynthesisVoiceName = 'en-US-AriaNeural';
speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm;

// Create the speech synthesizer.
var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

const text = `
Welcome to the world of frontend development, where UI libraries hold the key to creating stunning user interfaces. However, we all know that it's not always a smooth ride. Challenges in understanding complex documentation and finding relevant code examples can slow us down and hinder our creativity.
But fear not, for there's a solution that will revolutionize the way you work with UI libraries – introducing Tonic One, your AI companion for Tonic UI.
Tonic One is designed to empower frontend developers with an unparalleled experience, tackling the challenges of UI development head-on.
One of the first hurdles to overcome is the time-consuming search for UI components and libraries. Instant Search with Tonic One brings you real-time guidance, making the process of finding and implementing components a breeze.
Simply search for any component or keyword, and Tonic One will guide you on how to use it. Need to create an application using Tonic UI? Tonic One has got your back!
But we know that's not all you need. To truly stand out, you want to implement UI patterns that conform to the best practices in the industry.
With Tonic One, exploring widely-used UI patterns has never been easier. From a toast in a modal example to other complex patterns, Tonic One provides the inspiration and guidance you need.
Tonic One isn't just a search tool – it's an AI-powered enhancement that will take your code to the next level.
Paste your code, and watch as Tonic One suggests intelligent improvements to ensure cleaner and more maintainable code bases.
Now, you might be wondering how Tonic One works its magic. Behind the scenes, Tonic One is powered by LangChain, a sophisticated AI technology that delivers real-time assistance like never before.
Collaborate seamlessly with your team as Tonic One assists junior developers in learning from experienced members, promoting knowledge sharing and skill development.
Thanks to AI, Tonic One identifies and resolves issues faster, ensuring your code is always top-notch.
Say goodbye to hours of frustration and say hello to a smarter, faster, and more enjoyable frontend development journey.
Experience the efficiency of AI-powered support as Tonic One guides you through every step of the way.
Embrace the future of frontend development with Tonic One, and let AI unlock your true potential.
So, are you ready to take your frontend development to new heights?
Get started with Tonic One today and experience the power of AI at your fingertips.
Tonic One – Your AI Companion for Tonic UI
Empower your creativity, streamline your workflow, and embark on a journey of innovation with Tonic One. Try it now and witness the magic of AI transforming your frontend development experience. Tonic One – Where AI meets UI.
`.trim();

synthesizer.speakTextAsync(text, (result) => {
  if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
    console.log("synthesis finished.");
  } else {
    console.error("Speech synthesis canceled, " + result.errorDetails +
        "\nDid you set the speech resource key and region values?");
  }
  synthesizer.close();
  synthesizer = null;
  console.log("Now synthesizing to: " + audioFile);

}, (err) => {
  console.trace("err - " + err);
  synthesizer.close();
  synthesizer = null;
});
