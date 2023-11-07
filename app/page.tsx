import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import HabitsClient from "./components/HabitsClient";
import getHabits from "./actions/getHabits";
import Heading from "./components/Heading";
import AddTodo from "./components/navbar/AddTodo";

const Home = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Start a New Habit"
          showReset
        />
      </ClientOnly>
    );
  }

  const userHabits = await getHabits();

  if (userHabits.length === 0) {
    return (
      <ClientOnly>
        <div className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center
        text-2xl
        font-bold
        ">
          <AddTodo />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <HabitsClient
        userHabits={userHabits}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default Home;
