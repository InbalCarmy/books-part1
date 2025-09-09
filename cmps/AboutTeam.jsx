import { LongTxt } from "../cmps/LongTxt.jsx"


export function AboutTeam() {

     return (
        <section className="about-team">
            <h1>about Out Team</h1>
            <LongTxt 
                txt="Natus quis recusandae ratione aliquid reiciendis non deserunt tempora nemo optio animi harum, totam fugiat fugit eum ipsum quos autem odio tempore." 
                length={300}
            />
        </section>

     )
}