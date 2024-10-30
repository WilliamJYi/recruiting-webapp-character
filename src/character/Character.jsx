import { useState, useEffect } from "react";
import "./Character.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts";

function Character() {
  const [attributes, setAttributes] = useState({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });

  const [totalAttributePoints, setTotalAttributePoints] = useState(60);

  const [skills, setSkills] = useState({
    Acrobatics: 0,
    "Animal Handling": 0,
    Arcana: 0,
    Athletics: 0,
    Deception: 0,
    History: 0,
    Insight: 0,
    Intimidation: 0,
    Investigation: 0,
    Medicine: 0,
    Nature: 0,
    Perception: 0,
    Performance: 0,
    Persuasion: 0,
    Religion: 0,
    "Sleight of Hand": 0,
    Stealth: 0,
    Survival: 0,
  });

  const [totalSkillPoints, setTotalSkillPoints] = useState(
    10 + (Math.floor(attributes.Intelligence - 10) / 2) * 4
  );

  const [totalSkillPointsAvailable, setTotalSkillPointsAvailable] =
    useState(totalSkillPoints);

  useEffect(() => {
    const intelligenceModifier = Math.floor((attributes.Intelligence - 10) / 2);
    const newTotalSkillPoints = 10 + intelligenceModifier * 4;
    setTotalSkillPoints(newTotalSkillPoints);

    setTotalSkillPointsAvailable(
      (prevTotalAvailable) =>
        prevTotalAvailable + (newTotalSkillPoints - totalSkillPoints)
    );
  }, [attributes.Intelligence, totalSkillPoints]);

  //----------------ATTRIBUTES------------------------------

  const increaseAttribute = (attribute) => {
    if (totalAttributePoints < 70) {
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attribute]: prevAttributes[attribute] + 1,
      }));
      setTotalAttributePoints((prevTotal) => prevTotal + 1);
    }
  };

  const decreaseAttribute = (attribute) => {
    if (attributes[attribute] > 0) {
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attribute]: prevAttributes[attribute] - 1,
      }));
      setTotalAttributePoints((prevTotal) => prevTotal - 1);
    }
  };

  const displayAttributes = () => {
    return (
      <div className="attribute">
        <p>Total attribute points (Max 70): {totalAttributePoints}</p>
        {Object.keys(attributes).map((key) => {
          const modifier = Math.floor((attributes[key] - 10) / 2);
          return (
            <div key={key} className="attribute-row">
              <p>
                {key}: {attributes[key]} (Modifier: {modifier})
              </p>
              <button onClick={() => increaseAttribute(key)}>+</button>
              <button onClick={() => decreaseAttribute(key)}>-</button>
            </div>
          );
        })}
      </div>
    );
  };

  //----------------CLASSES------------------------------

  const checkMinRequirements = (classAttributes) => {
    return Object.keys(classAttributes).every((attribute) => {
      return attributes[attribute] >= classAttributes[attribute];
    });
  };

  const displayClasses = () => {
    return (
      <div>
        {Object.keys(CLASS_LIST).map((key) => {
          const classAttributes = CLASS_LIST[key];
          const meetsMinRequirement = checkMinRequirements(classAttributes);
          return (
            <div key={key}>
              <h3>Class name: {key}</h3>
              {/* When minimum requirement is met class requirements becomes visible */}
              {meetsMinRequirement ? (
                <div>
                  <p>Strength: {classAttributes.Strength}</p>
                  <p>Dexterity: {classAttributes.Dexterity}</p>
                  <p>Constitution: {classAttributes.Constitution}</p>
                  <p>Intelligence: {classAttributes.Intelligence}</p>
                  <p>Wisdom: {classAttributes.Wisdom}</p>
                  <p>Charisma: {classAttributes.Charisma}</p>
                </div>
              ) : (
                <p>Does not meet minimum requirements</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  //----------------SKILLS------------------------------

  const increaseSkill = (skill) => {
    if (totalSkillPointsAvailable > 0) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: prevSkills[skill] + 1,
      }));
      setTotalSkillPointsAvailable((prevTotal) => prevTotal - 1);
    }
  };

  const decreaseSkill = (skill) => {
    if (skills[skill] > 0) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: prevSkills[skill] - 1,
      }));
      setTotalSkillPointsAvailable((prevTotal) => prevTotal + 1);
    }
  };

  const displaySkills = () => {
    return (
      <div>
        <p>Total skill points: {totalSkillPoints}</p>
        <p>Total skill points available: {totalSkillPointsAvailable}</p>
        {SKILL_LIST.map((skill) => {
          const modifier = Math.floor(
            (attributes[skill.attributeModifier] - 10) / 2
          );
          return (
            <div className="skill">
              <p>
                {skill.name}: {skills[skill.name]} (Modifier:{" "}
                {skill.attributeModifier}): {modifier}
              </p>
              <button onClick={() => increaseSkill(skill.name)}>+</button>
              <button onClick={() => decreaseSkill(skill.name)}>-</button>
              <p>total: {skills[skill.name] + modifier}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="outer-container">
      <h1>Character</h1>
      <div className="inner-container">
        <div className="attributes">
          <h1>Attributes:</h1>
          {displayAttributes()}
        </div>
        <div className="classes">
          <h1>Classes:</h1>
          {displayClasses()}
        </div>
        <div className="skills">
          <h1>Skills:</h1>
          {displaySkills()}
        </div>
      </div>
    </div>
  );
}

export default Character;
