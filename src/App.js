import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Steps } from "antd";
import Questionare from "./Questionare";

const { Step } = Steps;

const App = () => {
  const [current, setCurrent] = React.useState(0); // set current value to move on next step
  const [steps, setSteps] = useState([]);

  const next = (i) => {
    setCurrent(i + 1); // increment in current to move on
    console.log("length:", steps.length);
    console.log("steps", steps);
    console.log("moving", i + 1);
  };

  const getAllQuestions = async () => {
    // api call to get question & answers array
    const res = await fetch("https://iceehao.github.io/JsonDataRevised/");
    const data = await res.json();
    // log api data on console
    console.log(data);
    // declare empty array to store steps
    const step = [];

    data.forEach((question, i) => {
      // store steps in empty array
      step.push({
        title: question.title,
        content: (
          <Questionare
            description={question.description}
            onFinish={(it) => {
              console.log(it);
              // if condition to check last index an notify if quiz is finished
              if (data.length - 1 == it) {
                alert("Quiz finished");
                // it will restart app if quiz is finished
                window.location.reload(false);
              }
              // if condition is false then move to next step
              else {
                next(it);
                console.log("agy gyaa ha");
              }
              console.log("end");
            }}
            answer={question.correct_answers}
            length={data.length}
            index={i}
          />
        ),
      });
    });
    // set steps in state for further use
    setSteps(step);
  };

  useEffect(() => {
    // function for api call
    getAllQuestions();
  }, []);

  return (
    <div className="app-contaner">
      <h1>Hao Tran Quiz Project</h1>
      <br />
      {/* // check steps length to display content */}
      {steps.length > 0 && (
        <>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="">{steps[current].content}</div>
        </>
      )}
    </div>
  );
};

export default App;
