import { Token } from '../models/token';

export class ChannelMessage {
    command: 'cleanStorage' | 'getStorage' | 'shareStorage';
    token: Token;
}
