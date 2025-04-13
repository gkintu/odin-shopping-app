import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

window.TextEncoder = TextEncoder;
window.TextDecoder = TextDecoder;