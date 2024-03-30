import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="image-skill" />
      <p className="name">{name}</p>
    </li>
  )
}

export default SkillItem
