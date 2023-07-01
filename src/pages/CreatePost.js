import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const stations_ace = [
  "Inwood - 207 St",
  "Dyckman St",
  "190 St",
  "181 St",
  "175 St",
  "168 St - Washington Hts",
  "163 St - Amsterdam Av",
  "155 St",
  "145 St",
  "135 St",
  "125 St",
  "116 St",
  "Cathedral Pkwy - 110 St",
  "103 St",
  "96 St",
  "86 St",
  "81 St - Museum of Natural History",
  "72 St",
  "59 St - Columbus Circle",
  "50 St",
  "42 St - Port Authority Bus Terminal",
  "34 St - Penn Station",
  "23 St",
  "14 St",
  "W 4 St",
  "Spring St",
  "Canal St",
  "Chambers St",
  "Fulton St",
  "High St",
  "Jay St - MetroTech",
  "Hoyt - Schermerhorn Sts",
  "Lafayette Av",
  "Nostrand Av",
  "Utica Av",
  "Ralph Av",
  "Rockaway Av",
  "Broadway Jct",
  "Liberty Av",
  "Van Siclen Av",
  "Shepherd Av",
  "Euclid Av",
  "Grant Av",
  "80 St",
  "88 St",
  "Rockaway Blvd",
  "104 St",
  "111 St",
  "Lefferts Blvd"
];

const stations_bdfm = [
  "Norwood - 205 St",
  "Bedford Park Blvd - Lehman College",
  "Kingsbridge Rd",
  "Fordham Rd",
  "182-183 Sts",
  "Tremont Av",
  "174-175 Sts",
  "170 St",
  "167 St",
  "161 St - Yankee Stadium",
  "155 St",
  "145 St",
  "135 St",
  "125 St",
  "116 St",
  "Cathedral Pkwy - 110 St",
  "103 St",
  "96 St",
  "86 St",
  "81 St - Museum of Natural History",
  "72 St",
  "57 St - 7 Av",
  "47-50 Sts - Rockefeller Ctr",
  "42 St - Bryant Pk",
  "34 St - Herald Sq",
  "23 St",
  "14 St",
  "W 4 St",
  "Broadway-Lafayette St",
  "2 Av",
  "Delancey St - Essex St",
  "East Broadway",
  "York St",
  "Jay St - MetroTech",
  "DeKalb Av",
  "Atlantic Av - Barclays Ctr",
  "Bergen St",
  "Carroll St",
  "Smith-9 Sts",
  "4 Av - 9 St",
  "7 Av",
  "15 St - Prospect Park",
  "Fort Hamilton Pkwy",
  "Church Av",
  "Ditmas Av",
  "18 Av",
  "20 Av",
  "Bay Pkwy",
  "Kings Hwy",
  "Avenue U",
  "Neck Rd",
  "Sheepshead Bay",
  "Brighton Beach",
  "Ocean Pkwy",
  "West 8 St - NY Aquarium",
  "Coney Island - Stillwell Av"
];

const stations_g = [
  "Court Sq",
  "21 St",
  "Greenpoint Av",
  "Nassau Av",
  "Metropolitan Av",
  "Broadway",
  "Flushing Av",
  "Myrtle - Willoughby Avs",
  "Bedford - Nostrand Avs",
  "Classon Av",
  "Clinton - Washington Avs",
  "Fulton St",
  "Hoyt - Schermerhorn Sts",
  "Bergen St",
  "Carroll St",
  "Smith - 9 Sts",
  "4 Av - 9 St",
  "15 St - Prospect Park",
  "Fort Hamilton Pkwy",
  "Church Av",
  "Beverley Rd",
  "Newkirk Plaza",
  "Kings Hwy",
  "Avenue H",
  "Avenue J",
  "Avenue M",
  "Avenue U",
  "Neck Rd",
  "Sheepshead Bay",
  "Brighton Beach",
  "Ocean Pkwy",
  "West 8 St - NY Aquarium",
  "Coney Island - Stillwell Av"
];

const stations_jz = [
  "Jamaica Center - Parsons/Archer",
  "Sutphin Blvd - Archer Av - JFK Airport",
  "Jamaica - Van Wyck",
  "Woodhaven Blvd",
  "85 St - Forest Pkwy",
  "75 St - Elderts Ln",
  "Cypress Hills",
  "Crescent St",
  "Norwood Av",
  "Cleveland St",
  "Van Siclen Av",
  "Alabama Av",
  "Broadway Junction",
  "Chauncey St",
  "Halsey St",
  "Gates Av",
  "Kosciuszko St",
  "Myrtle Av",
  "Flushing Av",
  "Lorimer St",
  "Hewes St",
  "Marcy Av",
  "Essex St",
  "Bowery",
  "Canal St",
  "Chambers St",
  "Fulton St",
  "Broad St",
  "Herald Sq - 34 St",
  "Pennsylvania Station",
  "Times Sq - 42 St",
  "Court Sq",
  "Queensboro Plaza",
  "Hunters Point Av",
  "Vernon Blvd - Jackson Av",
  "Grand St",
  "Lorimer St",
  "Graham Av",
  "Bedford Av",
  "Flushing Av",
  "Myrtle Av",
  "Kosciuszko St",
  "Gates Av",
  "Halsey St",
  "Chauncey St",
  "Broadway Junction",
  "Alabama Av",
  "Van Siclen Av",
  "Cleveland St",
  "Norwood Av",
  "Crescent St",
  "Cypress Hills",
  "75 St - Elderts Ln",
  "85 St - Forest Pkwy",
  "Woodhaven Blvd",
  "Jamaica - Van Wyck",
  "Sutphin Blvd",
  "Sutphin Blvd - Archer Av - JFK Airport",
  "Jamaica Center - Parsons/Archer"
];

const stations_l = [
  "8 Av",
  "6 Av",
  "Union Sq - 14 St",
  "3 Av",
  "1 Av",
  "Bedford Av",
  "Lorimer St",
  "Graham Av",
  "Grand St",
  "Montrose Av",
  "Morgan Av",
  "Jefferson St",
  "DeKalb Av",
  "Myrtle - Wyckoff Avs",
  "Halsey St",
  "Wilson Av",
  "Bushwick Av - Aberdeen St",
  "Broadway Jct",
  "Atlantic Av",
  "Sutter Av - Rutland Rd",
  "Livonia Av",
  "New Lots Av"
];

const stations_nqwr = [
  "Astoria - Ditmars Blvd",
  "Astoria Blvd",
  "30 Av",
  "Broadway",
  "36 Av",
  "39 Av",
  "Lexington Av / 59 St",
  "5 Av / 59 St",
  "57 St - 7 Av",
  "49 St",
  "Times Sq - 42 St",
  "34 St - Herald Sq",
  "28 St",
  "23 St",
  "Union Sq - 14 St",
  "8 St - NYU",
  "Prince St",
  "Canal St",
  "City Hall",
  "Cortlandt St",
  "Rector St",
  "Whitehall St",
  "Court St",
  "Jay St - MetroTech",
  "DeKalb Av",
  "Atlantic Av - Barclays Ctr",
  "Union St",
  "4 Av - 9 St",
  "Prospect Av",
  "25 St",
  "36 St",
  "45 St",
  "53 St",
  "59 St",
  "Bay Ridge Av",
  "77 St",
  "86 St",
  "Bay Ridge - 95 St"
];

const stations_s = [
  "Franklin Avenue - Botanic Garden",
  "Park Place",
  "Botanic Garden - Franklin Avenue",
];

const stations_123 = [
  "242nd Street - Van Cortlandt Park",
  "238th Street",
  "231st Street",
  "225th Street",
  "215th Street",
  "207th Street",
  "Dyckman Street",
  "191st Street",
  "181st Street",
  "168th Street - Washington Heights",
  "157th Street",
  "145th Street",
  "137th Street - City College",
  "125th Street",
  "116th Street - Columbia University",
  "Cathedral Parkway - 110th Street",
  "103rd Street",
  "96th Street",
  "86th Street",
  "79th Street",
  "72nd Street",
  "66th Street - Lincoln Center",
  "59th Street - Columbus Circle",
  "50th Street",
  "Times Square - 42nd Street",
  "34th Street - Penn Station",
  "28th Street",
  "23rd Street",
  "18th Street",
  "14th Street",
  "Christopher Street - Sheridan Square",
  "Houston Street",
  "Canal Street",
  "Franklin Street",
  "Chambers Street",
  "Cortlandt Street",
  "Rector Street",
  "South Ferry - Whitehall Street",
];

const stations_456 = [
  "Woodlawn",
  "Mosholu Parkway",
  "Bedford Park Boulevard - Lehman College",
  "Kingsbridge Road",
  "Fordham Road",
  "183rd Street",
  "Burnside Avenue",
  "176th Street",
  "Mt Eden Avenue",
  "170th Street",
  "167th Street",
  "161st Street - Yankee Stadium",
  "149th Street - Grand Concourse",
  "138th Street - Grand Concourse",
  "125th Street",
  "116th Street",
  "110th Street",
  "103rd Street",
  "96th Street",
  "86th Street",
  "77th Street",
  "68th Street - Hunter College",
  "59th Street",
  "51st Street",
  "42nd Street - Grand Central",
  "33rd Street",
  "28th Street",
  "23rd Street",
  "14th Street - Union Square",
  "Astor Place",
  "Bleecker Street",
  "Spring Street",
  "Canal Street",
  "Brooklyn Bridge - City Hall",
  "Fulton Street",
  "Wall Street",
  "Bowling Green",
];

const stations = [
  "Flushing - Main Street",
  "Flushing - Roosevelt Avenue",
  "Mets - Willets Point",
  "111th Street",
  "103rd Street - Corona Plaza",
  "Junction Boulevard",
  "90th Street - Elmhurst Avenue",
  "82nd Street - Jackson Heights",
  "74th Street - Broadway",
  "69th Street",
  "Woodside - 61st Street",
  "52nd Street",
  "46th Street - Bliss Street",
  "40th Street - Lowery Street",
  "33rd Street - Rawson Street",
  "Queensboro Plaza",
  "Court Square",
  "Hunters Point Avenue",
  "Vernon Boulevard - Jackson Avenue",
  "Grand Central - 42nd Street",
  "5th Avenue",
  "Times Square - 42nd Street",
  "34th Street - Hudson Yards",
];

function CreatePost({ isAuth }) {

  const [title, setTitle] = useState("");
  const [line, setLine] = useState("ACE");
  const [station, setStation] = useState("");
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files);
  };

  const createPost = async () => {
    const date = new Date();
    const imagesURL = [];

    for (let i = 0; i < selectedImage.length; i++) {
      const file = selectedImage[i];
      const storageRef = ref(storage, 'images/' + file.name); // Adjust the storage reference path as per your requirement
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL);
        imagesURL.push(downloadURL);
        // Do something with the download URL, such as storing it in a database or displaying it to the user
      } catch (error) {
        // Handle any errors that occur during the upload process
        console.log('Error uploading file:', error);
      }
    }

    await addDoc(postsCollectionRef, {
      title,
      date,
      line,
      station,
      postText,
      imagesURL,
      author: { 
        name: auth.currentUser.displayName, 
        id: auth.currentUser.uid 
      },
    });

    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>


        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div className="inputGp">
          <form>
            <select
                    onChange={(event) => {
                      setLine(event.target.value);
                    }}
                    >
              <option value="ACE">A, C, E</option>
              <option value="BDFM">B, D, F, M</option>
              <option value="G">G</option>
              <option value="JZ">J, Z</option>
              <option value="L">L</option>
              <option value="NQWR">N, Q, W, R</option>
              <option value="S">S</option>
              <option value="123">1, 2, 3</option>
              <option value="456">4, 5, 6</option>
              <option value="7">7</option>
            </select>
          </form>
        </div>

        <div className="inputGp">
          <label> Station:</label>
          <form>
            {line === "A" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_ace.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            
            ) : line === "B" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_bdfm.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : line === "G" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_g.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : line === "J" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_jz.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : line === "L" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_l.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : line === "N" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_nqwr.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : line === "S" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_s.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : line === "one" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_123.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : line === "four" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_456.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : line === "seven" ? (
                <select
                        onChange={(event) => {
                          setStation(event.target.value);
                        }}
                        >
                  {stations_bdfm.map((station, index) => (
                    <option key={index} value={station}>
                    {station}
                    </option>
                  ))}
                </select>
            ) : null}
          </form>
        </div>

        <div className="inputGp">
          <label> Review:</label>
          <textarea
            placeholder="Review..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        
        <div className="uploadImage">
          <input type="file" multiple onChange={handleImageChange} />
        </div>

        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;