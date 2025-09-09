import { LongTxt } from "../cmps/LongTxt.jsx"


export function AboutGoal() {

     return (
        <section className="about-goal">
            <h1>about Our Goal</h1>
            <LongTxt 
                txt="Natus quis recusandae ratione aliquid reiciendis non deserunt tempora nemo optio animi harum, totam fugiat fugit eum ipsum quos autem odio tempore." 
                length={300}
            />
        </section>

     )
}