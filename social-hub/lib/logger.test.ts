import { describe, it, expect, vi, beforeEach } from "vitest";
import { logger } from "@/lib/logger";

describe("logger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    logger.setLevel("info");
  });

  it("logs info messages", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => {});
    logger.info("test message", { key: "value" });
    expect(spy).toHaveBeenCalledWith("[INFO] test message", { key: "value" });
    spy.mockRestore();
  });

  it("logs error messages", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    logger.error("error message", { error: "details" });
    expect(spy).toHaveBeenCalledWith("[ERROR] error message", { error: "details" });
    spy.mockRestore();
  });

  it("logs warn messages", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    logger.warn("warn message");
    expect(spy).toHaveBeenCalledWith("[WARN] warn message");
    spy.mockRestore();
  });

  it("suppresses debug messages below threshold", () => {
    const spy = vi.spyOn(console, "debug").mockImplementation(() => {});
    logger.debug("debug message");
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("respects log level", () => {
    logger.setLevel("warn");
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    logger.info("should be suppressed");
    logger.warn("should appear");

    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith("[WARN] should appear");

    infoSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
