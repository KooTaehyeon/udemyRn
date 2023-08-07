import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
export default function App() {
  const [courseGoals, setCourseGoals] = useState<any>([]);

  const addGoalHandler = (enterGoalText: any) => {
    setCourseGoals((prev: string) => [
      ...prev,
      { text: enterGoalText, id: Math.random().toString() },
    ]);
  };
  const deleteGoalHandler = (id: string) => {
    setCourseGoals((prev: []) => {
      return prev.filter((item: { id: string }) => item.id !== id);
    });
  };
  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
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
