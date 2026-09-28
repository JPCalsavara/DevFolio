import { escapeLatex, generateResumeTex } from "../../src/lib/resumeGenerator";
import {
  collegeData,
  cvConfig,
  experiencesData,
  profileData,
  skillsData,
  socialLinks,
} from "../../src/data/portfolioData";
import { updateSectionInSource } from "../../src/lib/sourceUpdater";

describe("resumeGenerator & Local Persistence Engine", () => {
  it("escapes LaTeX special characters properly", () => {
    const raw = "C# & .NET 8_final% with 100% {success} and ~tilde^";
    const escaped = escapeLatex(raw);

    expect(escaped).to.include("\\&");
    expect(escaped).to.include("\\_");
    expect(escaped).to.include("\\%");
    expect(escaped).to.include("\\{");
    expect(escaped).to.include("\\}");
  });

  it("generates a complete LaTeX document without crashing", () => {
    const tex = generateResumeTex(
      profileData,
      experiencesData,
      skillsData,
      collegeData,
      cvConfig,
      socialLinks
    );

    expect(tex).to.be.a("string");
    expect(tex).to.include("\\documentclass");
    expect(tex).to.include("\\begin{document}");
    expect(tex).to.include("\\end{document}");
    expect(tex).to.include(escapeLatex(profileData.name));
  });

  it("updateSectionInSource safely updates source code with bracket balancing", () => {
    const dummySource = `
export const testItem: Record<string, string> = {
  "key": "value; with; semicolons;",
  "nested": "and } braces {"
};

export const anotherItem = 123;
`;

    const updated = updateSectionInSource(
      dummySource,
      "testItem",
      "Record<string, string>",
      { key: "new-value", extra: true }
    );

    expect(updated).to.include('"key": "new-value"');
    expect(updated).to.include('"extra": true');
    expect(updated).to.include("export const anotherItem = 123;");
  });
});
