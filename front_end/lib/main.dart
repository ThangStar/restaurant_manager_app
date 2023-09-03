import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:restaurant_manager_app/courses/aspect_ratio.dart';
import 'package:restaurant_manager_app/ui/blocs/order/order_bloc.dart';
import 'package:restaurant_manager_app/ui/blocs/product/product_bloc.dart';
import 'package:restaurant_manager_app/ui/screens/auth/login_screen.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:restaurant_manager_app/ui/blocs/auth/authentication_bloc.dart';
import 'package:restaurant_manager_app/ui/screens/intro/splash_screen.dart';
import 'package:restaurant_manager_app/ui/theme/color_schemes.dart';
import 'package:restaurant_manager_app/ui/theme/text_theme.dart';

void main() async {
  await dotenv.load(fileName: ".env");
  // IoClient().socket;
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
        providers: [
          BlocProvider(
            create: (context) => OrderBloc(),
          ),
          BlocProvider(
            create: (context) => ProductBloc(),
          ),
          BlocProvider(
            create: (context) => AuthenticationBloc(),
          ),
        ],
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
              useMaterial3: true,
              colorScheme: lightColorScheme,
              textTheme: textTheme(context)),
          // darkTheme: ThemeData(useMaterial3: true, colorScheme: darkColorScheme),
          home: const LoginScreen(),
        ));
  }
}
