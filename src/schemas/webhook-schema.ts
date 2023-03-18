import { z } from 'zod';

const MainWebhookSchema = z.object({
  ref: z.literal('refs/heads/main'),
  repository: z.object({
    html_url: z.string().url(),
  }),
  head_commit: z.object({
    id: z.string(),
    message: z.string(),
    author: z.object({
      name: z.string(),
    }),
  }),
});

type MainWebhook = z.infer<typeof MainWebhookSchema>;

const PullRequestWebhookSchema = z.object({
  action: z.union([z.literal('opened'), z.literal('synchronize')]),
  pull_request: z.object({
    head: z.object({
      repo: z.object({
        owner: z.object({
          login: z.string(),
        }),
        name: z.string(),
      }),
      sha: z.string(), // Commit hash
    }),
  }),
});

type PullRequestWebhook = z.infer<typeof MainWebhookSchema>;

const WebhookSchema = z.union([MainWebhookSchema, PullRequestWebhookSchema]);
type Webhook = z.infer<typeof WebhookSchema>;

export {
  WebhookSchema,
  Webhook,
  MainWebhookSchema,
  MainWebhook,
  PullRequestWebhookSchema,
  PullRequestWebhook,
};
