import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
export default function App() {
  const [courseGoals, setCourseGoals] = useState<any>([]);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const startAddGoalHandler = () => {
    // 모달 보이기
    setModalIsVisible((prev) => !prev);
  };
  const endAddGoalGandler = () => {
    setModalIsVisible((prev) => !prev);
  };
  const addGoalHandler = (enterGoalText: any) => {
    // goal 추가
    setCourseGoals((prev: string) => [
      ...prev,
      { text: enterGoalText, id: Math.random().toString() },
    ]);
    endAddGoalGandler();
  };
  const deleteGoalHandler = (id: string) => {
    // goal 삭제
    setCourseGoals((prev: []) => {
      return prev.filter((item: { id: string }) => item.id !== id);
    });
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title={'add New Goal'}
          color={'#a065ec'}
          onPress={startAddGoalHandler}
        />
        {modalIsVisible && (
          <GoalInput
            visible={modalIsVisible}
            onAddGoal={addGoalHandler}
            onCancel={endAddGoalGandler}
          />
        )}
        <View style={styles.goalsContauner}>
          <FlatList
            data={courseGoals}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            renderItem={(itemData: any) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContauner: {
    flex: 8,
  },
});
