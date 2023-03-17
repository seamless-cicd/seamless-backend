import { z } from 'zod';

const MainWebhookSchema = z.object({
  ref: z.literal('refs/heads/main'),
  head_commit: z.object({
    id: z.string(), // Commit hash
    message: z.string(),
    author: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  }),
});

type MainWebhook = z.infer<typeof MainWebhookSchema>;

const PullRequestWebhookSchema = z.object({
  action: z.union([z.literal('opened'), z.literal('synchronize')]),
  pull_request: z.object({
    title: z.string(),
    head: z.object({
      sha: z.string(), // Same as push's head_commit.id
    }),
  }),
});

type PullRequestWebhook = z.infer<typeof PullRequestWebhookSchema>;

export {
  MainWebhookSchema,
  MainWebhook,
  PullRequestWebhookSchema,
  PullRequestWebhook,
};
