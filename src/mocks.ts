import { Post } from "./types";
import moment from "moment";

export const basePost: Post = {
  id: 1,
  title: 'Base post',
  markdown: 'Content',
  html: '<p>Content</p>',
  authorId: 1,
  created: moment()
}

export const todayPost: Post = {
  ...basePost,
  title: 'Today'
}

export const thisWeekPost: Post = {
  ...basePost,
  title: 'This Week',
  created: moment().subtract(2, 'days')
}

export const thisMonthPost: Post = {
  ...basePost,
  title: 'Today',
  created: moment().subtract(2, 'weeks')
}
