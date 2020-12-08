import TurmsClient from "../turms-client";
import { im } from "../model/proto-bundle";
import { ParsedModel } from "../model/parsed-model";
import MessageAddition from "../model/message-addition";
import MessageDeliveryStatus = im.turms.proto.MessageDeliveryStatus;
export default class MessageService {
    private static readonly DEFAULT_MENTIONED_USER_IDS_PARSER;
    private _turmsClient;
    private _ackMessageTimerId?;
    private _unacknowledgedMessageIds;
    private _mentionedUserIdsParser?;
    private _onMessage?;
    get onMessage(): (message: ParsedModel.Message, messageAddition: MessageAddition) => void;
    set onMessage(value: (message: ParsedModel.Message, messageAddition: MessageAddition) => void);
    constructor(turmsClient: TurmsClient, ackMessageInterval?: number);
    sendMessage(isGroupMessage: boolean, targetId: string, deliveryDate?: Date, text?: string, records?: Uint8Array[], burnAfter?: number): Promise<string>;
    ackMessages(messageIds: string[]): Promise<void>;
    forwardMessage(messageId: string, isGroupMessage: boolean, targetId: string): Promise<string>;
    updateSentMessage(messageId: string, text?: string, records?: Uint8Array[]): Promise<void>;
    queryMessages(ids?: string[], areGroupMessages?: boolean, areSystemMessages?: boolean, fromId?: string, deliveryDateAfter?: Date, deliveryDateBefore?: Date, deliveryStatus?: string | MessageDeliveryStatus, size?: number): Promise<ParsedModel.Message[]>;
    queryPendingMessagesWithTotal(size?: number): Promise<ParsedModel.MessagesWithTotal[]>;
    queryMessageStatus(messageId: string): Promise<ParsedModel.MessageStatus[]>;
    recallMessage(messageId: string, recallDate?: Date): Promise<void>;
    readMessage(messageId: string, readDate?: Date): Promise<void>;
    markMessageUnread(messageId: string): Promise<void>;
    updateTypingStatusRequest(isGroupMessage: boolean, targetId: string): Promise<void>;
    isMentionEnabled(): boolean;
    enableMention(mentionedUserIdsParser?: (message: ParsedModel.Message) => string[]): void;
    static generateLocationRecord(latitude: number, longitude: number, locationName?: string, address?: string): Uint8Array;
    static generateAudioRecordByDescription(url: string, duration?: number, format?: string, size?: number): Uint8Array;
    static generateAudioRecordByData(data: ArrayBuffer): Uint8Array;
    static generateVideoRecordByDescription(url: string, duration?: number, format?: string, size?: number): Uint8Array;
    static generateVideoRecordByData(data: ArrayBuffer): Uint8Array;
    static generateImageRecordByData(data: ArrayBuffer): Uint8Array;
    static generateImageRecordByDescription(url: string, fileSize?: number, imageSize?: number, original?: boolean): Uint8Array;
    static generateFileRecordByDate(data: ArrayBuffer): Uint8Array;
    static generateFileRecordByDescription(url: string, format?: string, size?: number): Uint8Array;
    private _startAckMessagesTimer;
    private _parseMessageAddition;
    private static _createMessageRequest2Message;
}