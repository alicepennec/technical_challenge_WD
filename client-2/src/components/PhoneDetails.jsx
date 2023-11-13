const PhoneDetails = ({phoneId}) => {

    const [onePhone, setOnePhone] = useState(null);

    const getOnePhone = () => {
        axios
        .get(`${import.meta.env.VITE_API_URL}/phones/${phoneId}`)
        .then((response) => {
          const phone = response.data;
          setOnePhone(phone);
        })
        .catch((error) => console.log(error));
      }
    
      useEffect(() => {
        getOnePhone();
      }, [phoneId]);

    return !onePhone ? (<h1>Loading...</h1>) : ( 
    <div>
      <img src={onePhone.imageFileName} alt="phone-photo" />
      <h1>{onePhone.name}</h1>
      <h2>{onePhone.price}</h2>
      <p>{onePhone.color}</p>
      <p>{onePhone.description}</p>
    </div>
     );
}
 
export default PhoneDetails;