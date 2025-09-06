const {useParams, useNavigate, Link, Outlet} = ReactRouterDOM


export function AddReview(){

    const params = useParams()




    return(
        <section className="add-review">
            <form>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName"/>
            </form>

        </section>

    )
}