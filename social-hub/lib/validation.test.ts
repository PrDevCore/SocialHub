import { describe, it, expect } from "vitest";
import {
  CreatePostSchema,
  DisconnectAccountSchema,
  AuthUrlSchema,
} from "@/lib/validation";

describe("CreatePostSchema", () => {
  it("accepts valid input", () => {
    const result = CreatePostSchema.safeParse({
      caption: "Hello world",
      socialAccountIds: ["acc_123"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty caption", () => {
    const result = CreatePostSchema.safeParse({
      caption: "",
      socialAccountIds: ["acc_123"],
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty socialAccountIds", () => {
    const result = CreatePostSchema.safeParse({
      caption: "Hello",
      socialAccountIds: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid media URL", () => {
    const result = CreatePostSchema.safeParse({
      caption: "Hello",
      socialAccountIds: ["acc_123"],
      mediaUrls: ["not-a-url"],
    });
    expect(result.success).toBe(false);
  });

  it("rejects caption that is too long", () => {
    const result = CreatePostSchema.safeParse({
      caption: "a".repeat(5001),
      socialAccountIds: ["acc_123"],
    });
    expect(result.success).toBe(false);
  });
});

describe("DisconnectAccountSchema", () => {
  it("accepts valid input", () => {
    const result = DisconnectAccountSchema.safeParse({ accountId: "acc_123" });
    expect(result.success).toBe(true);
  });

  it("rejects missing accountId", () => {
    const result = DisconnectAccountSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("AuthUrlSchema", () => {
  it("accepts valid platform", () => {
    const result = AuthUrlSchema.safeParse({ platform: "instagram" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid platform", () => {
    const result = AuthUrlSchema.safeParse({ platform: "snapchat" });
    expect(result.success).toBe(false);
  });
});
