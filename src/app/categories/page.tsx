"use client";
import { useEffect, useState } from "react";
import { generateFakeSongs } from "@/utils/generateFakeData";
import { Pagination } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../_components/Spinner";

interface Song {
  id: string;
  song: string;
}

export default function Categories() {
  const [fakeData, setFakeData] = useState<Song[]>([]);

  const [page, setPage] = useState(1);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getFakeData = async () => {
    try {
      setLoading(true);
      const loadData = await generateFakeSongs(100);
      setFakeData(loadData);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFakeData();
  }, []);

  useEffect(() => {
    if (selectedSongs?.length > 0) {
      const debounceTimeout = setTimeout(() => {
        saveData();
      }, 500);

      return () => clearTimeout(debounceTimeout);
    }
  }, [selectedSongs]);

  const selectPageHandler = (selectedPage: number) => {
    if (selectedPage >= 1 && selectedPage <= fakeData?.length / 7) {
      setPage(selectedPage);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("api/users/get-data");
      setSelectedSongs(response?.data?.savedData);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const saveData = async () => {
    try {
      const response = await axios.post("api/users/save-data", selectedSongs);
      setSelectedSongs(response?.data?.interests);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedSongs?.includes(id)) {
      setSelectedSongs(selectedSongs.filter((songId) => songId !== id));
    } else {
      setSelectedSongs([...selectedSongs, id]);
    }
  };

  return (
    <main className="my-8 flex justify-center">
      <div className="w-full md:w-2/5 rounded-xl border-2 border-gray-300 px-6 py-4 lg:px-12 lg:py-8">
        <h1 className="text-center text-2xl font-bold">
          Please mark your interests!
        </h1>

        <p className="mb-4 mt-2 text-center text-xs font-semibold">
          We will keep you notified.
        </p>

        <label className="text-base font-semibold">My Saved interests!</label>

        {loading ? (
          <div className="flex justify-center items-center my-12 w-full ">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="my-4 space-y-3">
              {fakeData?.slice(page * 7 - 7, page * 7)?.map((item, index) => (
                <div key={index} className="flex items-center gap-3 ">
                  <input
                    className="h-5 w-5 accent-black cursor-pointer "
                    id={item.song.replaceAll(" ", "")}
                    type="checkbox"
                    name={item.song}
                    value={item.song}
                    checked={selectedSongs?.includes(
                      item?.song?.replaceAll(" ", "")
                    )}
                    onChange={() =>
                      handleCheckboxChange(item?.song?.replaceAll(" ", ""))
                    }
                  />
                  <label
                    className="cursor-pointer font-medium text-sm"
                    htmlFor={item.song.replaceAll(" ", "")}
                  >
                    {item.song}
                  </label>
                </div>
              ))}
            </div>
            {/* flex items-center justify-center space-x-3 */}
            <div className="my-8 flex items-center justify-center text-gray-400">
              <Pagination
                count={Math.ceil(fakeData.length / 7)}
                onChange={(event, page) => selectPageHandler(page)}
                showFirstButton
                showLastButton
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
