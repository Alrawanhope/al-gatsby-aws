import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
const initialState = { name: "", description: "" };

const App = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await props.awsRawan.listFinalCodeViaAmplifyGQLClient();
      console.log("Amplify Data", todoData);
      const todoData2 = await props.awsRawan.listFinalCodesAppSyncSDK();
      console.log("AppSync Data", todoData2);
      const todos = todoData.data.listFinalCodes.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodoAmplify() {
    try {
      if (!formState.name && !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await props.awsRawan.createFinalCodeViaAmplifyGQLClient(todo);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  async function addTodoAppSync() {
    try {
      if (!formState.name && !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await props.awsRawan.createFinalCodeAppSyncSDK(todo);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  async function deleteTodoAmplify(id) {
    try {
      await props.awsRawan.deleteFinalCodeViaAmplifyGQLClient(id);
      const deletedTodo = todos.filter((todo) => todo.id !== id);
      setTodos(deletedTodo);
    } catch (err) {
      console.log("ERR DELETE", err);
    }
  }

  async function deleteTodoAppSync(id) {
    try {
      await props.awsRawan.deleteFinalCodeAppSyncSDK(id);
      const deletedTodo = todos.filter((todo) => todo.id !== id);
      setTodos(deletedTodo);
    } catch (err) {
      console.log("ERR DELETE", err);
    }
  }

  async function manualSignUp() {
    try {
      const user = await props.awsRawan.signUp({
        username: "AL",
        password: "12345678",
        email: "rawan@sataiva.com",
      });
      console.log("SUCCESS", user);
    } catch (err) {
      console.log("ERR SIGN UP", err);
    }
  }

  async function manualConfirm() {
    try {
      const user = await props.awsRawan.confirmSignUp({
        username: "AL",
        code: "501062",
      });
      console.log("SUCCESS", user);
    } catch (err) {
      console.log("ERR SIGN UP", err);
    }
  }

  async function manualResend() {
    try {
      const user = await props.awsRawan.resendSignUp({ username: "AL" });
      console.log("SUCCESS", user);
    } catch (err) {
      console.log("ERR SIGN UP", err);
    }
  }

  async function manualSignOut() {
    try {
      const user = await props.awsRawan.signOut();
      console.log("SUCCESS", user);
    } catch (err) {
      console.log("ERR SIGN UP", err);
    }
  }

  async function manualSignIn() {
    try {
      const user = await props.awsRawan.signIn({
        username: "AL",
        password: "rawan@sataiva",
      });
      console.log("SUCCESS", user);
    } catch (err) {
      console.log("ERR SIGN UP", err);
    }
  }

  async function manualIsUserAuthenticated() {
    try {
      const user = await props.awsRawan.isUserAuthenticated();
      console.log("SUCCESS", user);
    } catch (err) {
      console.log("ERR", err);
    }
  }

  async function manualGetCurrentUser() {
    try {
      const user = await props.awsRawan.getCurrentUser();
      console.log("SUCCESS", user);
    } catch (err) {
      console.log("ERR", err);
    }
  }

  return (
    <Authenticator signUpAttributes={["email"]}>
      {({ signOut, user }) => (
    <div style={styles.container}>
      {console.log("ALL TODO", todos)}
      <button onClick={manualSignUp}>Manual sign up test</button>
      <button onClick={manualConfirm}>Manual confirm test</button>
      <button onClick={manualResend}>Manual Resend test</button>
      <button onClick={manualSignOut}>Manual sign out test</button>
      <button onClick={manualSignIn}>Manual sign in test</button>

      <button onClick={manualIsUserAuthenticated}>
        Manual isUserAuthenticated test
      </button>
      <button onClick={manualGetCurrentUser}>Manual getCurrentUser test</button>

      <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
            {/* <button onClick={props.awsRawan.uploadToS31}>S3</button> */}
          </main>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput("description", event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodoAmplify}>
        Create Todo via Amplify
      </button>
      <br />
      <button style={styles.button} onClick={addTodoAppSync}>
        Create Todo AppSync SDK
      </button>
      <div style={{ display: "flex", gap: "10%" }}>
        <div>
          <p>Via Amplify</p>
          {todos.map((todo, index) => (
            <div key={todo.id ? todo.id : index} style={styles.todo}>
              <p style={styles.todoName}>{todo.name}</p>
              <p style={styles.todoDescription}>{todo.description}</p>
              <button onClick={() => deleteTodoAmplify(todo.id)}>DELETE</button>
            </div>
          ))}
        </div>
        <div>
          <p>Via AppSync</p>
          {todos.map((todo, index) => (
            <div key={todo.id ? todo.id : index} style={styles.todo}>
              <p style={styles.todoName}>{todo.name}</p>
              <p style={styles.todoDescription}>{todo.description}</p>
              <button onClick={() => deleteTodoAppSync(todo.id)}>DELETE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
      )}
    </Authenticator>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default App;
