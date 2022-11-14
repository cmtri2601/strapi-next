import React from 'react';
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin } from 'antd';

import { createPost } from '../utils/service/post';

const AddPostButton = ({updatePosts}) => {
  const [form] = Form.useForm();
  const {
    modalProps,
    formProps,
    show,
    formLoading,
    defaultFormValuesLoading,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    form,
    async submit({ title, content, slug }) {
      await createPost(title, content, slug);
      updatePosts();
    }
  });
  
  return (
    <div>
      <Modal {...modalProps} title="useModalForm" okText="submit" width={600}>
        <Spin spinning={formLoading || defaultFormValuesLoading}>
          <Form layout="inline" {...formProps}>
            <Form.Item label="Title" name="title">
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item label="Content" name="content">
              <Input placeholder="Content" />
            </Form.Item>

            <Form.Item label="Slug" name="slug">
              <Input placeholder="Slug" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Button onClick={show}>Create post</Button>
    </div>
  );
};

export default AddPostButton