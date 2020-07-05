import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import IconButton from '../../atoms/IconButton';
import SafeAreaView from 'react-native-safe-area-view';
import { useNavigation } from '@react-navigation/native';
import { TextField, dismiss } from '../../atoms';
import Button from '../../atoms/Button';
import { COLOR } from '../../../constants/theme';
import testIDs from '../../../constants/testIDs';
import { Todo } from '../../../domain/models';
import { useControlledComponent, useNetworker } from '../../../lib/hooks';
import { UiContext, UserContext } from '../../../contexts';
import * as TodosRepository from '../../../domain/repositories/todos';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: COLOR.MAIN,
  },
  text: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

interface Props {
  actions: {
    addTodo: (newValues: Todo.Values) => void;
  };
}

export default function Input(props: Props) {
  const { userState } = React.useContext(UserContext);
  const { setError } = React.useContext(UiContext);
  const title = useControlledComponent('');
  const detail = useControlledComponent('');

  const { goBack } = useNavigation();
  const back = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const addTodo = React.useCallback(() => {
    const newValues = { title: title.value, detail: detail.value };
    const newTodo = Todo.factory(newValues);

    try {
      if (!userState) {
        return;
      }

      TodosRepository.add(userState.id, newTodo);
    } catch (e) {
      setError(e);
    }

    back();
    title.onChangeText('');
    detail.onChangeText('');
  }, [title, detail, back, userState, setError]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismiss} testID={testIDs.TODO_INPUT_DISMISS}>
        <View style={styles.container} testID={testIDs.TODO_INPUT_SCREEN}>
          <IconButton
            icon="close"
            size={30}
            iconColor={COLOR.PRIMARY}
            onPress={back}
            style={styles.iconButton}
            testID={testIDs.TODO_INPUT_CLOSE}
          />
          <TextField
            label="Title"
            value={title.value}
            onChangeText={title.onChangeText}
            style={styles.text}
            testID={testIDs.TODO_INPUT_TITLE}
          />
          <TextField
            label="Detail"
            value={detail.value}
            onChangeText={detail.onChangeText}
            style={styles.text}
            testID={testIDs.TODO_INPUT_DETAIL}
          />
          <Button
            onPress={addTodo}
            label="Add"
            style={styles.button}
            disabled={!title.value}
            testID={testIDs.TODO_INPUT_ADD_BUTTON}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
