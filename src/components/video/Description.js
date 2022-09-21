import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import { useDeleteVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";

export default function Description({ video }) {
  const navigate = useNavigate();
  const { id, title, description, date } = video;
  const [deleteVideo, { isLoading, isError, error, isSuccess }] =
    useDeleteVideoMutation();
  const handleDelete = () => {
    if (id) deleteVideo(id);
  };
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-800">
        {title}
      </h1>
      <div className="pb-4 flex items-center space-between border-b gap-4">
        <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
          Uploaded on {date}
        </h2>

        <div className="flex gap-6 w-full justify-end">
          <Link to={`/videos/edit/${id}`}>
            <div className="flex gap-1 cursor-pointer">
              <div className="shrink-0">
                <img className="w-5 block" src={editImage} alt="Edit" />
              </div>
              <span className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                Edit
              </span>
            </div>
          </Link>
          <div onClick={handleDelete} className="flex gap-1 cursor-pointer">
            <div className="shrink-0">
              <img className="w-5 block" src={deleteImage} alt="Delete" />
            </div>
            <div className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
              Delete
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
        {description}
      </div>
      {isError && <Error message="There was an error Deleting the video!" />}
    </div>
  );
}
