import React, { useState } from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../src/images/logo.jpeg'
import HackathonImage from '../src/images/hackaton.jpeg'
import { BASE_URL } from './config';
import HashLoader from 'react-spinners/HashLoader.js';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


function App() {


   const initialFormData = {
    groupName: '',
    projectName: '',
    schoolName: '',
    email: '',
    projectLeader: {
      name: '',
      phoneNumber: '',
    },
    projectDescription: '',
    otherParticipantsInfo: '',
  };


  const [formData, setFormData] = useState(initialFormData);
  const resetForm = () => {
    setFormData(initialFormData);
  };
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProjectLeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      projectLeader: {
        ...formData.projectLeader,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Inscription réussie !');
        // Réinitialiser le formulaire ou effectuer une autre action
        resetForm();
      } else {
        throw new Error("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  return (
    <div className='contenu'> 
     <Particles
      id="tsparticles"
      init={particlesInit}

      options={{
        "fullScreen": {
            "enable": true,
            "zIndex": 1
        },
        "particles": {
            "number": {
                "value": 10,
                "density": {
                    "enable": false,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#27ae60"
            },
            "shape": {
                "type": "star",
                "options": {
                    "sides": 5
                }
            },
            "opacity": {
                "value": 0.8,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "rotate": {
                "value": 0,
                "random": true,
                "direction": "clockwise",
                "animation": {
                    "enable": true,
                    "speed": 5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 600,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": ["grab"]
                },
                "onclick": {
                    "enable": false,
                    "mode": "bubble"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "background": {
            "color": "#ecf0f1",
            "image": "",
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
        }
    }}
    />

      <div className="App" >
        <ToastContainer />
        <div className="header">
          <img src={Logo} alt="Logo de l'entreprise" className="logo" />
          <h1>Inscription à  l'Hackathon</h1>
        </div>
        <img src={HackathonImage} alt="Lancement de l'hackathon" className="hackathon-image" />
        {/* Vos éléments de formulaire */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleInputChange}
            placeholder="Nom du groupe"
            required
          />
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            placeholder="Nom du projet"
            required
          />
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleInputChange}
            placeholder="Nom de l'école"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.projectLeader.name}
            onChange={handleProjectLeaderChange}
            placeholder="Nom du chef de projet"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.projectLeader.phoneNumber}
            onChange={handleProjectLeaderChange}
            placeholder="Numéro du chef de projet"
            required
          />
          <textarea
            rows={8}
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Description du projet"
            required
            style={{ resize: 'none' }}

          />
          <textarea
            rows={4}
            name="otherParticipantsInfo"
            value={formData.otherParticipantsInfo}
            onChange={handleInputChange}
            placeholder="Nom et numero des autres membres"
            required
            style={{ resize: 'none' }}

          />
          <div className="submit-button-container">
          <button type='submit' disabled={loading}>
            {loading ? (
              <div className="hash-loader-container">
                <HashLoader size={25} />
              </div>
            ) : (
              "Soumettre"
            )}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default App;
