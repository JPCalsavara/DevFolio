import React from 'react'
import App from '../../src/components/App'
import {
  projectsData,
  experiencesData,
  skillsData,
  tagsData,
  legendItems
} from '../../src/data/portfolioData'

describe('<App /> Component Test (Fallback Data Flow)', () => {
  it('renders successfully using the local fallback data', () => {
    const mockProjects = projectsData.map(p => ({
      ...p,
      id: p.slug,
      tecnosUsed: p.tecnosUsed || [],
      imageUrl: p.urlName ? `/images/projects/${p.urlName}` : null,
      produtionLink: p.produtionLink || null,
      repositoryLink: p.repositoryLink || null,
      detailsGoal: null,
      detailsHighlights: [],
      detailsImpact: null,
      createdAt: new Date().toISOString(),
      summaryLine: p.summaryLine || null,
      period: p.period || null,
    }));

    const mockExperiences = experiencesData.map(e => ({
      ...e,
      id: e.slug || 'id',
      slug: e.slug || 'slug',
      location: e.location || null,
      period: e.period || null,
      role: e.role || null,
      achievements: e.achievements || [],
      skillsLearned: e.skillsLearned || [],
      imageUrls: e.imageNames ? e.imageNames : e.imageName ? [e.imageName] : [],
      introTitle: null,
      intro: null,
      createdAt: new Date().toISOString(),
    }));

    cy.mount(
      <App 
        projects={mockProjects} 
        experiences={mockExperiences} 
        technologies={[]} 
        legendItems={legendItems} 
        tagsMap={{}} 
      />
    );
    
    // Check if the hero section or a specific fallback project is visible
    cy.get('body').should('contain', projectsData[0].title);
    cy.get('body').should('contain', experiencesData[0].title);
  })
})
