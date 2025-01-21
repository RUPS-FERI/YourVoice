"use client";

import { Accordion, AccordionItem, Tab, Tabs } from "@heroui/react";
import { useLayoutEffect, useState } from "react";

import PostCard from "@/app/posts/components/post.component";
import { Post, PostService } from "@/app/_common/services/posts.service";

export default function PostsPage() {
  const [postCards, setPostCards] = useState<Post[]>([]);

  useLayoutEffect(() => {
    PostService.get.getPosts();
    PostService.get.posts$.subscribe((posts) => {
      setPostCards(posts);
    });
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="posts" title="Posts">
          {postCards.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Tab>
        <Tab key="groups" title="Groups">
          <Accordion variant={"bordered"}>
            <AccordionItem title={"RUPS Skupina 1"}>
              {postCards
                .filter((p) => p.id == 0 || p.id == 2)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </AccordionItem>
            <AccordionItem title={"RUPS Skupina 2"}>
              {postCards
                .filter((p) => p.id == 1)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </AccordionItem>
          </Accordion>
        </Tab>
      </Tabs>
    </div>
  );
}
