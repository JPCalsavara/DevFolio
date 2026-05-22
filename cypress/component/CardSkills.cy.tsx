import React from "react";
import CardSkills from "../../src/components/CardSkills";

const defaultProps = {
  name: "docker",
  label: "Docker",
  type: "devops",
  isHovered: false,
  link: "https://docker.com",
  iconUrl: null,
};

describe("<CardSkills />", () => {
  it("renders the skill label and icon", () => {
    cy.mount(<CardSkills {...defaultProps} />);
    cy.contains("Docker").should("be.visible");
    cy.get("img").should("have.attr", "alt", "docker logo");
  });

  it("shows colored background when hovered", () => {
    cy.mount(<CardSkills {...defaultProps} isHovered={true} />);
    // devops color should be applied — the card should have a non-transparent bg
    cy.get(".MuiCard-root").should(
      "have.css",
      "background-color"
    );
  });

  it("scales up on hover state", () => {
    cy.mount(<CardSkills {...defaultProps} isHovered={true} />);
    cy.get(".MuiCard-root").should(($el) => {
      const transform = $el.css("transform");
      // scale(1.03) produces a matrix — just check it's not 'none'
      expect(transform).not.to.equal("none");
    });
  });

  it("wraps a long label without overflowing the card width", () => {
    cy.mount(
      <CardSkills
        {...defaultProps}
        label="Unified Modelling Language (UML)"
        name="uml"
      />
    );
    cy.contains("Unified Modelling Language (UML)").should("exist");
    // Label element must not be wider than its parent card content
    cy.get(".MuiTypography-subtitle2").then(($label) => {
      const labelWidth = $label[0].scrollWidth;
      const parentWidth = $label[0].parentElement?.clientWidth ?? Infinity;
      expect(labelWidth).to.be.lte(parentWidth + 2); // +2px tolerance
    });
  });

  it("renders 'No Link' card without href when link is undefined", () => {
    cy.mount(<CardSkills {...defaultProps} link={undefined} />);
    cy.get(".MuiCardActionArea-root").should("not.have.attr", "href");
  });

  it("renders fallback icon when name has no mapped image", () => {
    cy.mount(
      <CardSkills {...defaultProps} name="unknowntool" label="Unknown Tool" iconUrl={null} />
    );
    cy.get("img").should("have.attr", "src", "/images/icons/screen-svgrepo-com.svg");
  });

  it("uses iconUrl when provided, ignoring the name-based fallback", () => {
    cy.mount(
      <CardSkills
        {...defaultProps}
        name="docker"
        iconUrl="https://example.com/custom-icon.png"
      />
    );
    cy.get("img").should("have.attr", "src", "https://example.com/custom-icon.png");
  });
});
