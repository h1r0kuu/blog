import { ReactElement } from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import AuthService from "../../services/AuthService";
import {RegistrationRequest} from "../../models/registration/RegistrationRequest";

const Registration = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<RegistrationRequest>()

  const onSubmit: SubmitHandler<RegistrationRequest> = (data: RegistrationRequest) => {
    AuthService.register(data).then(r => console.log(r))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingEmail" placeholder="Email" {...register("email")} />
                  <label htmlFor="floatingEmail">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" placeholder="Username" {...register("username")} />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" {...register("password")} />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="file" className="form-control" id="floatingAvatar" {...register("avatar")} />
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                    Sign up
                  </button>
                </div>
                <div className="my-1">
                  <p>
                    Already have an account? <a href="/login">Login</a>
                  </p>
                </div>
                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                    <i className="fab fa-google me-2"></i> Sign up with Google
                  </button>
                </div>
                <div className="d-grid">
                  <button className="btn btn-facebook btn-login text-uppercase fw-bold" type="submit">
                    <i className="fab fa-facebook-f me-2"></i> Sign up with Facebook
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
