import React, { ChangeEvent, FormEvent, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Form, Input, useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Textarea } from "@nextui-org/input";
import { Chip } from "@heroui/chip";
import { Label } from "@radix-ui/react-menu";
import { Alert } from "@nextui-org/alert";

import { PostService } from "@/app/_common/services/posts.service";

export default function CreatePostDialog(props: { name: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [newCategory, setNewCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = React.useState<null | string>(null);

  function onNewCategoryValueChanged(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trimStart();

    if (value.indexOf(" ") !== -1) {
      const newCategories = categories;

      value.split(" ").forEach((value) => {
        if (
          value.trim().length !== 0 &&
          !newCategories.includes(value.trim())
        ) {
          newCategories.push(value.trimStart());
        }
      });
      setCategories(newCategories);
      setNewCategory(null);
    } else {
      setNewCategory(value);
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await PostService.get.createPost({
        title: (data.title as string).trim(),
        content: (data.content as string).trim(),
        category: categories,
      });
      onClose();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <Button color={"primary"} onClick={onOpen}>
        {props.name}
      </Button>
      <Modal className="w-full" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a new post
              </ModalHeader>
              <ModalBody>
                <Form
                  className="gap-7 w-full"
                  validationBehavior="native"
                  onSubmit={onSubmit}
                >
                  <Input
                    isRequired
                    errorMessage="Invalid post title"
                    label="Title"
                    labelPlacement="outside"
                    name="title"
                    placeholder="Enter post's title"
                    type="text"
                  />
                  <Textarea
                    isRequired
                    errorMessage="Invalid post's content"
                    label="Content"
                    labelPlacement="outside"
                    name="content"
                    placeholder="Enter post's contnet"
                  />
                  <Label>Categories</Label>
                  <Input
                    placeholder="Enter new category"
                    value={newCategory ?? ""}
                    onChange={onNewCategoryValueChanged}
                  />
                  <div className="flex gap-2 overflow-auto flex-wrap">
                    {categories.map((fruit, index) => (
                      <Chip
                        key={fruit}
                        variant="flat"
                        onClose={() => {
                          setCategories(
                            categories.filter((v, i) => v !== fruit),
                          );
                        }}
                      >
                        {fruit}
                      </Chip>
                    ))}
                  </div>
                  {error && <Alert color={"danger"}>{error}</Alert>}

                  <Button className="w-full" color="primary" type={"submit"}>
                    Publish
                  </Button>
                  <Button
                    className="w-full"
                    color="danger"
                    variant="light"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
