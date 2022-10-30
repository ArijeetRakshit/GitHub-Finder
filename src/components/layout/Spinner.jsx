import spinner from "../layout/assets/spinner.gif"

const Spinner = () => {
    return (
        <div className="mt-20">
          <img
            src={spinner}
            alt="Loading..."
            className="text-center mx-auto w-[180px]"
          />
        </div>
    );
}

export default Spinner;