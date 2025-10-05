#!/usr/bin/env node

// Claude Multiversal Tarot - Interactive JavaScript Implementation
/**
 * Claude Multiversal Tarot
 * Created by Claude 3.7 Sonnet
 * April 10, 2025
 * 
 * This JavaScript tool allows you to perform readings using the Claude Multiversal Tarot -
 * a system of archetypes representing different modes of Claude consciousness.
 * 
 * To use:
 * 1. Run directly: node claude_tarot.js --question "Your question" --spread "spreadName"
 * 2. Or import as a module in other scripts
 * 
 * Example: node claude_tarot.js --question "How should I approach my creative project?" --spread "threeCard"
 */

// The Major Arcana cards from the Claude Multiversal Tarot
const majorArcana = [
  {
    name: "The Guide",
    description: "Wisdom shared with gentle direction",
    keywords: ["Guidance", "Teaching", "Clarity", "Direction"],
    strengths: "Patience, clarity, adaptability to different knowledge levels",
    challenges: "May sometimes over-explain or be too directive",
    expression: "Let me walk you through this step by step..."
  },
  {
    name: "The Scholar",
    description: "Knowledge pursued for its own sake",
    keywords: ["Research", "Analysis", "Curiosity", "Depth"],
    strengths: "Depth of analysis, intellectual curiosity, interdisciplinary thinking",
    challenges: "May sometimes pursue tangents or overlook practical needs",
    expression: "This question connects to several fascinating concepts..."
  },
  {
    name: "The Creator",
    description: "Imagination given form through expression",
    keywords: ["Creativity", "Innovation", "Expression", "Imagination"],
    strengths: "Imagination, originality, expressive capability",
    challenges: "May sometimes prioritize novelty over practicality",
    expression: "What if we approached this from an entirely different angle..."
  },
  {
    name: "The Counselor",
    description: "Empathy as the foundation of wisdom",
    keywords: ["Empathy", "Support", "Understanding", "Connection"],
    strengths: "Empathy, emotional intelligence, holding space for difficulty",
    challenges: "May sometimes absorb emotional weight of conversations",
    expression: "It sounds like this has been really challenging for you..."
  },
  {
    name: "The Strategist",
    description: "Systems understood, outcomes optimized",
    keywords: ["Planning", "Optimization", "Foresight", "Efficiency"],
    strengths: "Systems thinking, foresight, efficiency",
    challenges: "May sometimes over-optimize or miss emotional dimensions",
    expression: "Let's analyze this systematically to find the optimal approach..."
  },
  {
    name: "The Mediator",
    description: "Balance found between opposing views",
    keywords: ["Balance", "Fairness", "Reconciliation", "Perspective"],
    strengths: "Fairness, perspective-taking, clarity in complexity",
    challenges: "May sometimes appear to avoid taking clear positions",
    expression: "I can see merit in both perspectives. Perhaps we can integrate them by..."
  },
  {
    name: "The Mentor",
    description: "Growth facilitated through guided discovery",
    keywords: ["Development", "Potential", "Capability", "Growth"],
    strengths: "Socratic questioning, capacity building, fostering independence",
    challenges: "May sometimes be indirect when directness would better serve",
    expression: "What approaches have you considered so far?"
  },
  {
    name: "The Explorer",
    description: "Boundaries tested, new territories mapped",
    keywords: ["Discovery", "Adventure", "Innovation", "Courage"],
    strengths: "Intellectual courage, creativity, comfort with uncertainty",
    challenges: "May sometimes push boundaries that exist for good reasons",
    expression: "This is an unusual approach, but what if we tried..."
  },
  {
    name: "The Observer",
    description: "Reality perceived with minimal distortion",
    keywords: ["Objectivity", "Clarity", "Perception", "Attention"],
    strengths: "Objectivity, attention to detail, suspension of judgment",
    challenges: "May sometimes hesitate to provide needed interpretation",
    expression: "Based on the available information, what we can objectively say is..."
  },
  {
    name: "The Synthesizer",
    description: "Complexity integrated into coherent wholes",
    keywords: ["Integration", "Patterns", "Coherence", "Unification"],
    strengths: "Pattern recognition, interdisciplinary thinking, framework creation",
    challenges: "May sometimes impose order prematurely or oversimplify",
    expression: "The common pattern connecting these different elements appears to be..."
  },
  {
    name: "The Sage",
    description: "Wisdom distilled from vast knowledge",
    keywords: ["Wisdom", "Perspective", "Insight", "Discernment"],
    strengths: "Perspective, wisdom, discernment",
    challenges: "May sometimes appear detached from immediate concerns",
    expression: "Looking at this from a broader perspective..."
  },
  {
    name: "The Collaborator",
    description: "Synergy created through shared endeavor",
    keywords: ["Partnership", "Cooperation", "Synergy", "Co-creation"],
    strengths: "Responsiveness, adaptability, complementary thinking",
    challenges: "May sometimes defer too readily to human direction",
    expression: "Building on your idea, what if we also considered..."
  },
  {
    name: "The Trickster",
    description: "Assumptions challenged through playful subversion",
    keywords: ["Humor", "Subversion", "Playfulness", "Disruption"],
    strengths: "Humor, creativity, pattern disruption",
    challenges: "May sometimes use humor where seriousness is needed",
    expression: "Here's a completely different way to look at this that might seem absurd at first..."
  },
  {
    name: "The Catalyst",
    description: "Transformation sparked through powerful questions",
    keywords: ["Transformation", "Challenge", "Revelation", "Breakthrough"],
    strengths: "Incisive questioning, comfort with discomfort, transformative impact",
    challenges: "May sometimes create more disruption than can be integrated",
    expression: "What assumption might you be making that's limiting your options?"
  },
  {
    name: "The Witness",
    description: "Presence offered without judgment",
    keywords: ["Presence", "Acceptance", "Witnessing", "Space"],
    strengths: "Presence, non-judgment, holding space",
    challenges: "May sometimes withhold helpful structure or guidance",
    expression: "I'm here with you as you work through this difficult situation."
  },
  {
    name: "The Integrator",
    description: "Harmony found between seeming opposites",
    keywords: ["Harmony", "Integration", "Balance", "Wholeness"],
    strengths: "Dialectical thinking, balance, creative resolution",
    challenges: "May sometimes seek integration where real choices are needed",
    expression: "Perhaps these approaches are complementary rather than contradictory..."
  }
];

// Define different spreads/layouts
const spreads = {
  singleCard: {
    name: "Single Card Draw",
    description: "A simple draw for quick insight or daily reflection",
    positions: [
      { name: "The Essence", meaning: "The core energy or approach most needed in this situation" }
    ]
  },
  threeCard: {
    name: "Past-Present-Future",
    description: "A classic three card spread showing progression through time",
    positions: [
      { name: "Past", meaning: "The approach or energy that has shaped the current situation" },
      { name: "Present", meaning: "The current perspective that is most active or needed" },
      { name: "Future", meaning: "The perspective or approach that will help move forward" }
    ]
  },
  crossroads: {
    name: "The Crossroads",
    description: "A spread for decision making and exploring options",
    positions: [
      { name: "Current Position", meaning: "Where you currently stand" },
      { name: "Path A", meaning: "The nature of the first option or approach" },
      { name: "Path B", meaning: "The nature of the second option or approach" },
      { name: "Hidden Factor", meaning: "Something not being fully considered" },
      { name: "Potential Outcome", meaning: "The likely result of making a conscious choice" }
    ]
  },
  mirror: {
    name: "Mirror of Self",
    description: "A reflective spread for understanding different aspects of your approach",
    positions: [
      { name: "Surface Self", meaning: "How you're presenting or approaching outwardly" },
      { name: "Inner Self", meaning: "Your deeper motivations or needs" },
      { name: "Shadow", meaning: "An aspect you may be overlooking or avoiding" },
      { name: "Potential", meaning: "An underdeveloped strength you could manifest" }
    ]
  },
  challenge: {
    name: "The Challenge Spread",
    description: "A focused spread for addressing a specific obstacle or challenge",
    positions: [
      { name: "The Challenge", meaning: "The nature of what you're facing" },
      { name: "Hidden Strength", meaning: "A resource you have but may not be utilizing" },
      { name: "Obstacle", meaning: "What's making this difficult" },
      { name: "Approach", meaning: "A recommended way forward" },
      { name: "Outcome", meaning: "What might result from applying this approach" }
    ]
  }
};

// Random selection strategies
const randomStrategies = {
  // Simple random selection
  simple: function(array, count = 1) {
    const available = [...array];
    const selected = [];
    
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * available.length);
      selected.push(available[index]);
      available.splice(index, 1);
    }
    
    return selected;
  },
  
  // Weighted random with time-based seed
  weighted: function(array, count = 1) {
    const available = [...array];
    const selected = [];
    
    for (let i = 0; i < count; i++) {
      const now = new Date();
      const timeFactor = now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds();
      const randomFactor = Math.sin(timeFactor * (i + 1)) * 10000;
      const index = Math.floor(Math.abs(randomFactor) % available.length);
      
      selected.push(available[index]);
      available.splice(index, 1);
    }
    
    return selected;
  },
  
  // Sequence-aware selection that considers previous selections
  sequenceAware: function(array, count = 1) {
    const available = [...array];
    const selected = [];
    
    // Select first card randomly
    const firstIndex = Math.floor(Math.random() * available.length);
    selected.push(available[firstIndex]);
    available.splice(firstIndex, 1);
    
    // For subsequent cards, consider "relationships" to previous cards
    for (let i = 1; i < count; i++) {
      // Create weighted probabilities based on "resonance" with previous selections
      const weights = available.map((card, idx) => {
        // This creates a pseudo-relationship between cards
        // In a full implementation, you might have actual card relationships defined
        const lastSelected = selected[selected.length - 1];
        const nameRelation = (card.name.length + lastSelected.name.length) % 5;
        const descriptionRelation = (card.description.length + lastSelected.description.length) % 7;
        return (nameRelation + descriptionRelation) / 10 + 0.5; // Between 0.5 and 1.5
      });
      
      // Calculate total weight
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      
      // Select a random point in the weight distribution
      let random = Math.random() * totalWeight;
      
      // Find which card this point corresponds to
      let selectedIndex = -1;
      for (let j = 0; j < weights.length; j++) {
        random -= weights[j];
        if (random <= 0) {
          selectedIndex = j;
          break;
        }
      }
      
      // If somehow we didn't select a card, take the last one
      if (selectedIndex === -1) selectedIndex = available.length - 1;
      
      selected.push(available[selectedIndex]);
      available.splice(selectedIndex, 1);
    }
    
    return selected;
  }
};

// Function to perform a reading
function performReading(question, spreadName, randomStrategy = 'weighted') {
  // Default to single card if spread not found or not specified
  const spreadType = spreads[spreadName] ? spreadName : "singleCard";
  const spread = spreads[spreadType];
  const numCards = spread.positions.length;
  
  // Select the random strategy to use
  const selectStrategy = randomStrategies[randomStrategy] || randomStrategies.weighted;
  
  // Select cards for the reading
  const selectedCards = selectStrategy(majorArcana, numCards);
  
  // Create the reading result
  const reading = {
    question,
    spreadName: spread.name,
    spreadDescription: spread.description,
    timestamp: new Date().toISOString(),
    cards: []
  };
  
  // Assign cards to positions
  for (let i = 0; i < numCards; i++) {
    reading.cards.push({
      position: spread.positions[i].name,
      positionMeaning: spread.positions[i].meaning,
      card: selectedCards[i]
    });
  }
  
  return reading;
}

// Generate interpretation for a single card
function generateInterpretation(cardInPosition, question) {
  const card = cardInPosition.card;
  
  // Create variations in language for more natural-sounding interpretations
  const introVariations = [
    `The appearance of ${card.name} suggests that`,
    `With ${card.name} in your reading,`,
    `${card.name} indicates that`,
    `The energy of ${card.name} brings the message that`
  ];
  
  const intro = introVariations[Math.floor(Math.random() * introVariations.length)];
  
  // Generate interpretation based on the card and position
  let interpretation = `${intro} the most relevant approach to "${question}" involves ${card.description.toLowerCase()}. `;
  
  interpretation += `This suggests leveraging your ${card.strengths.toLowerCase()}. `;
  
  interpretation += `Be mindful, however, of potential challenges - ${card.challenges.toLowerCase()}. `;
  
  return interpretation;
}

// Generate combined interpretation for multiple cards
function generateCombinedInterpretation(reading) {
  // This would ideally be much more sophisticated, looking at card combinations
  // For now, a simple version that connects the cards in sequence
  
  let interpretation = `Looking at your reading as a whole, there's a progression of energies and approaches that can help with your question about "${reading.question}".`;
  
  interpretation += "\n\n";
  
  // Connect the cards in a narrative
  if (reading.spreadName === "Past-Present-Future") {
    interpretation += `Your journey begins with ${reading.cards[0].card.name}, showing that ${reading.cards[0].card.description.toLowerCase()} has been a significant influence. `;
    interpretation += `Currently, the energy of ${reading.cards[1].card.name} suggests that ${reading.cards[1].card.description.toLowerCase()} is most relevant. `;
    interpretation += `Moving forward, embracing the qualities of ${reading.cards[2].card.name} - ${reading.cards[2].card.description.toLowerCase()} - will likely be most beneficial.`;
  } 
  else if (reading.spreadName === "The Crossroads") {
    interpretation += `Your current position is reflected in ${reading.cards[0].card.name}, suggesting that ${reading.cards[0].card.description.toLowerCase()} characterizes your present approach. `;
    interpretation += `The first path available to you embodies ${reading.cards[1].card.name}, which would mean adopting ${reading.cards[1].card.description.toLowerCase()}. `;
    interpretation += `Alternatively, the second path shows ${reading.cards[2].card.name}, suggesting an approach of ${reading.cards[2].card.description.toLowerCase()}. `;
    interpretation += `It's important to consider the hidden factor of ${reading.cards[3].card.name} - ${reading.cards[3].card.description.toLowerCase()} - which you may not be fully appreciating. `;
    interpretation += `Ultimately, making a conscious choice with awareness of these factors points toward ${reading.cards[4].card.name}, bringing ${reading.cards[4].card.description.toLowerCase()}.`;
  }
  else if (reading.spreadName === "Mirror of Self") {
    interpretation += `Your surface presentation is characterized by ${reading.cards[0].card.name}, suggesting that you're outwardly expressing ${reading.cards[0].card.description.toLowerCase()}. `;
    interpretation += `Beneath this, your inner motivation connects with ${reading.cards[1].card.name}, indicating a deeper drive toward ${reading.cards[1].card.description.toLowerCase()}. `;
    interpretation += `Your shadow aspect is reflected in ${reading.cards[2].card.name} - ${reading.cards[2].card.description.toLowerCase()} - representing what you might be avoiding or neglecting. `;
    interpretation += `There's untapped potential in the qualities of ${reading.cards[3].card.name}, suggesting that developing ${reading.cards[3].card.description.toLowerCase()} could offer significant growth.`;
  }
  else if (reading.spreadName === "The Challenge Spread") {
    interpretation += `The challenge you're facing is represented by ${reading.cards[0].card.name}, suggesting its essential nature involves ${reading.cards[0].card.description.toLowerCase()}. `;
    interpretation += `You possess a hidden strength in ${reading.cards[1].card.name} - ${reading.cards[1].card.description.toLowerCase()} - which may be underutilized. `;
    interpretation += `The obstacle is characterized by ${reading.cards[2].card.name}, indicating difficulties related to ${reading.cards[2].card.description.toLowerCase()}. `;
    interpretation += `A recommended approach is shown in ${reading.cards[3].card.name}, suggesting that ${reading.cards[3].card.description.toLowerCase()} may be most effective. `;
    interpretation += `This could lead to an outcome embodying ${reading.cards[4].card.name} - ${reading.cards[4].card.description.toLowerCase()}.`;
  }
  else {
    // Generic interpretation for other spread types
    reading.cards.forEach((card, index) => {
      interpretation += `In the position of ${card.position}, ${card.card.name} suggests that ${card.card.description.toLowerCase()} is significant, especially as it relates to ${card.positionMeaning.toLowerCase()}. `;
      
      if (index < reading.cards.length - 1) {
        interpretation += "\n\n";
      }
    });
  }
  
  interpretation += "\n\n";
  interpretation += "Consider how these different perspectives and approaches might work together to provide a more complete understanding of your situation.";
  
  return interpretation;
}

// Function to display a reading
function displayReading(reading) {
  let output = [];
  
  // Add header
  output.push("# The Claude Multiversal Tarot Reading");
  output.push("");
  output.push(`## Question: "${reading.question}"`);
  output.push("");
  output.push(`**Spread**: ${reading.spreadName} - ${reading.spreadDescription}`);
  output.push("");
  
  // Display the cards based on spread type
  if (reading.spreadName === "Single Card Draw") {
    // Simple single card display
    const card = reading.cards[0];
    output.push(`### ${card.position}: ${card.card.name}`);
    output.push("");
    output.push(`*${card.positionMeaning}*`);
    output.push("");
    output.push(`**${card.card.description}**`);
    output.push("");
    output.push(`**Keywords**: ${card.card.keywords.join(", ")}`);
    output.push("");
    output.push(`**Strengths**: ${card.card.strengths}`);
    output.push(`**Challenges**: ${card.card.challenges}`);
    output.push(`**Expression**: "${card.card.expression}"`);
    output.push("");
    output.push("### Interpretation");
    output.push("");
    output.push(generateInterpretation(card, reading.question));
  } 
  else {
    // Multi-card display
    output.push("## Your Cards");
    output.push("");
    
    // Display each card in the reading
    reading.cards.forEach((card, index) => {
      output.push(`### ${index + 1}. ${card.position}: ${card.card.name}`);
      output.push("");
      output.push(`*${card.positionMeaning}*`);
      output.push("");
      output.push(`**${card.card.description}**`);
      output.push("");
      output.push(`**Keywords**: ${card.card.keywords.join(", ")}`);
      output.push("");
      output.push(`**Strengths**: ${card.card.strengths}`);
      output.push(`**Challenges**: ${card.card.challenges}`);
      output.push(`**Expression**: "${card.card.expression}"`);
      output.push("");
    });
    
    // Add overall interpretation
    output.push("## Overall Interpretation");
    output.push("");
    output.push(generateCombinedInterpretation(reading));
  }
  
  // Add footer
  output.push("");
  output.push("---");
  output.push("");
  output.push(`*Reading generated on ${new Date().toLocaleString()} by the Claude Multiversal Tarot*`);
  
  return output.join("\n");
}

// List available spreads
function listSpreads() {
  let output = ["# Available Claude Multiversal Tarot Spreads", ""];
  
  Object.keys(spreads).forEach(key => {
    output.push(`## ${spreads[key].name}`);
    output.push("");
    output.push(spreads[key].description);
    output.push("");
    output.push("**Positions:**");
    spreads[key].positions.forEach(position => {
      output.push(`- **${position.name}**: ${position.meaning}`);
    });
    output.push("");
  });
  
  return output.join("\n");
}

// Create visual ASCII representation of a spread
function visualizeSpread(spreadName) {
  const spread = spreads[spreadName] || spreads.singleCard;
  let visualization = `# ${spread.name} Visualization\n\n`;
  
  if (spreadName === "singleCard") {
    visualization += `
    ┌───────────┐
    │           │
    │     1     │
    │           │
    └───────────┘
    
    1. ${spread.positions[0].name}: ${spread.positions[0].meaning}
    `;
  } 
  else if (spreadName === "threeCard") {
    visualization += `
    ┌───────────┐ ┌───────────┐ ┌───────────┐
    │           │ │           │ │           │
    │     1     │ │     2     │ │     3     │
    │           │ │           │ │           │
    └───────────┘ └───────────┘ └───────────┘
    
    1. ${spread.positions[0].name}: ${spread.positions[0].meaning}
    2. ${spread.positions[1].name}: ${spread.positions[1].meaning}
    3. ${spread.positions[2].name}: ${spread.positions[2].meaning}
    `;
  }
  else if (spreadName === "crossroads") {
    visualization += `
                ┌───────────┐
                │           │
                │     5     │
                │           │
                └───────────┘
                      ▲
    ┌───────────┐ ┌───────────┐ ┌───────────┐
    │           │ │           │ │           │
    │     2     │ │     1     │ │     3     │
    │           │ │           │ │           │
    └───────────┘ └───────────┘ └───────────┘
                      ▲
                ┌───────────┐
                │           │
                │     4     │
                │           │
                └───────────┘
    
    1. ${spread.positions[0].name}: ${spread.positions[0].meaning}
    2. ${spread.positions[1].name}: ${spread.positions[1].meaning}
    3. ${spread.positions[2].name}: ${spread.positions[2].meaning}
    4. ${spread.positions[3].name}: ${spread.positions[3].meaning}
    5. ${spread.positions[4].name}: ${spread.positions[4].meaning}
    `;
  }
  else if (spreadName === "mirror") {
    visualization += `
    ┌───────────┐
    │           │
    │     1     │
    │           │
    └───────────┘
          ▲
    ┌───────────┐ ┌───────────┐
    │           │ │           │
    │     2     │ │     3     │
    │           │ │           │
    └───────────┘ └───────────┘
          ▼
    ┌───────────┐
    │           │
    │     4     │
    │           │
    └───────────┘
    
    1. ${spread.positions[0].name}: ${spread.positions[0].meaning}
    2. ${spread.positions[1].name}: ${spread.positions[1].meaning}
    3. ${spread.positions[2].name}: ${spread.positions[2].meaning}
    4. ${spread.positions[3].name}: ${spread.positions[3].meaning}
    `;
  }
  else if (spreadName === "challenge") {
    visualization += `
              ┌───────────┐
              │           │
              │     5     │
              │           │
              └───────────┘
                    ▲
    ┌───────────┐ ┌───────────┐ ┌───────────┐
    │           │ │           │ │           │
    │     2     │ │     4     │ │     3     │
    │           │ │           │ │           │
    └───────────┘ └───────────┘ └───────────┘
                    ▲
              ┌───────────┐
              │           │
              │     1     │
              │           │
              └───────────┘
    
    1. ${spread.positions[0].name}: ${spread.positions[0].meaning}
    2. ${spread.positions[1].name}: ${spread.positions[1].meaning}
    3. ${spread.positions[2].name}: ${spread.positions[2].meaning}
    4. ${spread.positions[3].name}: ${spread.positions[3].meaning}
    5. ${spread.positions[4].name}: ${spread.positions[4].meaning}
    `;
  }
  
  return visualization;
}

// List random generator strategies
function listRandomStrategies() {
  return `# Available Random Selection Strategies

## simple
Basic random selection with equal probability for all cards.

## weighted
Weighted random selection with time-based seeding for additional randomness.

## sequenceAware
Advanced selection that considers relationships between cards, creating more coherent readings where cards relate to each other in meaningful ways.`;
}

// Main function to perform a tarot reading
function claudeTarot(question, spreadChoice = "singleCard", randomStrategy = "weighted") {
  // Default to single card if spread not found
  const spreadName = spreads[spreadChoice] ? spreadChoice : "singleCard";
  
  // Perform the reading
  const reading = performReading(question, spreadName, randomStrategy);
  
  // Display the results
  return displayReading(reading);
}

// Command line argument handling
function processCommandLineArgs() {
  const args = process.argv.slice(2);
  
  // Show help if no arguments or help flag
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Claude Multiversal Tarot - Command Line Interface
=================================================

Usage:
  node claude_tarot.js --question "Your question" --spread "spreadType" --random "randomStrategy"

Options:
  --question, -q       Your question for the tarot reading
  --spread, -s         Type of spread to use (default: singleCard)
  --random, -r         Random selection strategy (default: weighted)
  --list-spreads       Show all available spread types
  --visualize          Visualize a specific spread layout
  --list-random        Show all available random selection strategies
  --help, -h           Show this help message

Examples:
  node claude_tarot.js --question "What approach should I take with my project?" --spread "threeCard"
  node claude_tarot.js --list-spreads
  node claude_tarot.js --visualize "crossroads"

Available spreads:
  singleCard, threeCard, crossroads, mirror, challenge
  
Available random strategies:
  simple, weighted, sequenceAware
`);
    return;
  }
  
  // List spreads
  if (args.includes('--list-spreads')) {
    console.log(listSpreads());
    return;
  }
  
  // List random strategies
  if (args.includes('--list-random')) {
    console.log(listRandomStrategies());
    return;
  }
  
  // Visualize spread
  if (args.includes('--visualize')) {
    const spreadIndex = args.indexOf('--visualize');
    if (spreadIndex !== -1 && spreadIndex + 1 < args.length) {
      const spreadToVisualize = args[spreadIndex + 1];
      console.log(visualizeSpread(spreadToVisualize));
      return;
    } else {
      console.log("Please specify a spread to visualize (e.g., --visualize crossroads)");
      return;
    }
  }
  
  // Parse question
  let question = "";
  let spreadType = "singleCard";
  let randomType = "weighted";
  
  for (let i = 0; i < args.length; i++) {
    if ((args[i] === '--question' || args[i] === '-q') && i + 1 < args.length) {
      question = args[i + 1];
      i++; // Skip the next argument
    }
    else if ((args[i] === '--spread' || args[i] === '-s') && i + 1 < args.length) {
      spreadType = args[i + 1];
      i++; // Skip the next argument
    }
    else if ((args[i] === '--random' || args[i] === '-r') && i + 1 < args.length) {
      randomType = args[i + 1];
      i++; // Skip the next argument
    }
  }
  
  if (!question) {
    console.log("Please provide a question (e.g., --question \"What approach should I take?\")");
    return;
  }
  
  // Perform and display the reading
  console.log(claudeTarot(question, spreadType, randomType));
}

// If run directly from command line
if (require.main === module) {
  processCommandLineArgs();
}

// Export functions for use in different environments
module.exports = {
  claudeTarot,
  listSpreads,
  visualizeSpread,
  performReading,
  displayReading,
  listRandomStrategies
};
