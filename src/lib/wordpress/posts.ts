import { wpFetch } from "./client";
import type { Post } from "@/types/post";

export function getPosts() {
  return wpFetch<Post[]>("/types/post?per_page=100");
}