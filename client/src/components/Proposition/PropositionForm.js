import { useState,useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import {useMutation} from '@apollo/react-hooks';
import {FETCH_PROPOSITIONS_QUERY} from 'src/util/graphql';
import {CREATE_PROPOSITION_MUTATION} from 'src/util/graphql';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_PTYPES_QUERY} from 'src/util/graphql';
import {CREATE_PTYPE_MUTATION} from 'src/util/graphql';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import PropositionFormValidation from 'src/components/Proposition/PropositionFormValidation';



const PropositionForm = ({handleSubmitClose}) => {
const [other,setOther] = useState("");
const [selectedDate, setSelectedDate] = useState(new Date(''));
const [errors, setErrors] = useState({});
const [newType,setNewType] = useState({
value : '',
label : ''});
const {data:{ getPtypes: ptypes} = {}} = useQuery(FETCH_PTYPES_QUERY);
const [values,setValues] = useState({
  body: '',
  type : '',
  date : ''
})
const [createProposition,{error}] = useMutation(CREATE_PROPOSITION_MUTATION,{
	variables : ({date: selectedDate,body : values.body , type : values.type}),
	update(proxy,result) {
    const data = proxy.readQuery({
		query : FETCH_PROPOSITIONS_QUERY
    });
	data.getPropositions = [result.data.createProposition, ...data.getPropositions];
	proxy.writeQuery({query: FETCH_PROPOSITIONS_QUERY, data});
	}
});
const [createPtype] = useMutation(CREATE_PTYPE_MUTATION,{
  variables : newType,
  update(_,result) {
   },
});
const handleChange = (event) => {
  setValues({ ...values, [event.target.name]: event.target.value });
};
const handleChange1 = (event) => {
  setNewType({ ...newType, [event.target.name]: event.target.value });
  if (other === 'Autre') {
    setValues({body:values.body, type : newType.value, date : values.date});
  }

};
const handleSubmit = (event) => {
  event.preventDefault();
  createProposition();
  if (other === 'Autre') {
  createPtype();}

};
function handleClick() {
  handleSubmitClose();
}
const handleDateChange = (date) => {  
  setSelectedDate(date);
};
 return (
    <>
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={8}
              xs={12}
            >
            <TextField
                fullWidth
                label="Type de proposition"
                name="type"
                onChange={(e)=>{handleChange(e);
                setOther(e.target.value)
                }}
                required
                select
                SelectProps={{ native: true }}
                value={values.type}
                variant="filled"
              >
              {ptypes && ptypes.map((option) => (
                  <option
                    key={option.id}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
              </Grid>
            {other==='Autre' && (
              <>
              <Grid
              item
              md={8}
            >
              <TextField
                fullWidth
                label="Nom du type"
                name="value"
                onChange={handleChange1}
                required
                value={newType.value}
                variant="filled"
              />
              </Grid>
              <Grid
              item
              md={8}
            >
              <TextField
                fullWidth
                label="Label du type"
                name="label"
                onChange={handleChange1}
                required
                value={newType.label}
                variant="filled"
              />
              </Grid>
              </>)}
            <Grid
              item
              md={12}
            >
            <TextField
                fullWidth
                label="Details"
                name="body"
                multiline
                maxrows={Infinity}
                rows={4}
                onChange={handleChange}
                required
                value={values.body}
                variant="filled"
              />
              {errors.body && <Typography>{errors.body}</Typography>}
            </Grid>
            <Grid
              item
              md={12}
              sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
              }}
            >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker label="Date"
            mask="dd/mmm/yyyy"
            value={selectedDate} 
            onChange={handleDateChange}
            variant = "filled" 
            renderInput={(props) => <TextField {...props} />} />
            </LocalizationProvider>
            </Grid>
          </Grid>
        <Divider />
          <Button
            color="primary"
            variant="contained"
			type="submit"
			onClick={()=> {handleClick();
      }
      }
          >
            Save details
          </Button>
          <Button
            color="primary"
            variant="contained"
			type="reset"
          >
            Cancel
          </Button>
    </form>
  </>
    );
};

export default PropositionForm;
