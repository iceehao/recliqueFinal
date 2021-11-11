import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Button, Select, Input, Form, Radio } from "antd";
import Swal from "sweetalert2";

const Questionare = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const onFinish = (values) => {
    if (values.Maintype === "cash") {
      var cash = props.answer[0].entries;
      // set flag value to check conditions for sweetalert
      var check = false;
      cash.map((ans) => {
        // if condition to check selected answers with correct answers
        if (
          ans.when === values.when &&
          ans.type === values.type &&
          ans[values.drCr] == values.drCrValue
        ) {
          check = true;
        }
      });
      // if condition to checked correct answer then show sweetalert according to wrong/right anwers
      if (check === true) {
        Swal.fire({
          title: "Your answer is correct!",
          text: "Do you want to continue",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          console.log("Success:", values);
          form.resetFields();
          props.onFinish(props.index);
        });
      } else {
        Swal.fire({
          title: "Your answer is incorrect!",
          text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
    //  else condition to check correct answers if user select accural type
    else {
      var accural = props.answer[1].entries;
      var ch = false;
      accural.map((ans) => {
        // if condition to check selected answers with correct answers
        if (
          ans.when === values.when &&
          ans.type === values.type &&
          ans[values.drCr] == values.drCrValue
        ) {
          ch = true;
        }
      });
      if (ch === true) {
        // if condition to checked correct answer then show sweetalert according to wrong/right anwers
        Swal.fire({
          title: "Your answer is correct!",
          text: "Do you want to continue",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          console.log("Success:", values);
          // reset form
          form.resetFields();
          // call finish function to move on to next step
          props.onFinish(props.index);
        });
      }
      // if slected answer is weong show worng answer alert
      else {
        Swal.fire({
          title: "Your answer is wrong!",
          text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };
  // failed function in case of user input invalid fields
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // main div starts from here
    <div>
      <h2>Question</h2>
      <p>{props.description}</p> {/* question description fetched from api */}
      <Form
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2>Type {""}</h2>
        <Form.Item initialValue="cash" name="Maintype">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="cash">Cash</Radio.Button>
            <Radio.Button value="accural">Accural</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Day" name="when">
          <Input placeholder="mm/dd" />
        </Form.Item>
        {/* type dropdown */}
        <Form.Item label="Type" name="type">
          <Select placeholder="Select type" onChange={handleChange}>
            <Option value="cash">cash</Option>
            <Option value="revenue">revenue</Option>
            <Option value="receivable">receivable</Option>
            <Option value="deferred">deferred</Option>
            <Option value="contra">contra</Option>
            <Option value="system-credit">system-credit</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Dr/Cr">
          <Input.Group compact>
            <Form.Item
              name="drCr"
              noStyle
              rules={[{ required: true, message: "Select dr/cr" }]}
            >
              <Select
                style={{ width: "50%" }}
                placeholder="Dr/Cr"
                onChange={handleChange}
              >
                <Option value="Dr">Dr</Option>
                <Option value="Cr">Cr</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="drCrValue"
              noStyle
              onChange={handleChange}
              rules={[{ required: true, message: "" }]}
            >
              <Input style={{ width: "50%" }} placeholder="0" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="button" type="primary" htmlType="submit">
            {/*  check if last index show finish text otherwise display submit text on button */}
            {props.index == props.length - 1 ? " Finish" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Questionare;
