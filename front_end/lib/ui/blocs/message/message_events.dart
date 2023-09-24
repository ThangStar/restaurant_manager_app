part of 'message_bloc.dart';

abstract class MessageEvent extends Equatable {
  const MessageEvent();

  @override
  List<Object> get props => [];
}

class InitMessageEvent extends MessageEvent {
  final List<Message>? msgs;

  const InitMessageEvent({this.msgs});
}

class ActionSendMessage extends MessageEvent {
  Message msg;

  ActionSendMessage({required this.msg});
}
