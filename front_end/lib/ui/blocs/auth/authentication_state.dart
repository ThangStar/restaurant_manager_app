part of 'authentication_bloc.dart';

class AuthenticationState extends Equatable {
  final Object data;
  const AuthenticationState({this.data = const []});
  @override
  List<Object> get props => [data];
}

class AuthLoginProgress extends AuthenticationState {
  @override
  // TODO: implement props
  List<Object> get props => [];
  //save token to local
}

class AuthLoginSuccess extends AuthenticationState {}

class AuthLoginFailed extends AuthenticationState {}

class AuthLoginConnectionFailed extends AuthenticationState {}
