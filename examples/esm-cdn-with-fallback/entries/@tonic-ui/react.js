// Combined @tonic-ui/react entry. The entire package closure (Emotion, peers,
// sub-dependencies) is inlined into this one module; only the React family
// stays external. This mirrors what `?standalone&external=react,react-dom`
// produces on a (self-hosted) esm.sh instance.
export * from '@tonic-ui/react';
