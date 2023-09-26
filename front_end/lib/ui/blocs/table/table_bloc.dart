import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:restaurant_manager_app/model/table.dart';

part 'table_events.dart';

part 'table_state.dart';

class TableBloc extends Bloc<TableEvent, TableState> {
  TableBloc()
      : super(const TableState(
          status: TableStatus.initial,
        )) {
    on<OnTableChange>(_onTableChange);
    on<OnFilterTable>(_onFilterTable);
  }

  FutureOr<void> _onTableChange(
      OnTableChange event, Emitter<TableState> emit) async {
    emit(state.copyWith(tables: event.tables, tablesFilter: event.tables));
  }

  FutureOr<void> _onFilterTable(OnFilterTable event, Emitter<TableState> emit) {
    if(event.status == 0){
      emit(state.copyWith(tablesFilter: state.tables));
    }else{
      List<Table> tbs = List.from(state.tables)..removeWhere((element) => element.status != event.status);
      emit(state.copyWith(tablesFilter: tbs));
    }
  }
}
