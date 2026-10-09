import { describe, expect, it } from "vitest";
import { describeGoogleSignInError } from "./auth-error";

describe("Google sign-in errors", () => {
  it("identifies an unauthorized published domain", () => {
    expect(
      describeGoogleSignInError({ code: "auth/unauthorized-domain" }, "tello-vrl4.onrender.com"),
    ).toContain("tello-vrl4.onrender.com");
  });

  it("does not report a user-cancelled popup as a failure", () => {
    expect(describeGoogleSignInError({ code: "auth/popup-closed-by-user" })).toBeNull();
  });

  it("distinguishes a network failure from a blocked popup", () => {
    expect(describeGoogleSignInError({ code: "auth/network-request-failed" })).toContain("conexão");
    expect(describeGoogleSignInError({ code: "auth/popup-blocked" })).toContain("popups");
  });
});
