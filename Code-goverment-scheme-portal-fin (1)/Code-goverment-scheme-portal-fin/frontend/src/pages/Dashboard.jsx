import { Avatar, Box, Button, CircularProgress, Container, IconButton, Rating, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Details } from '@mui/icons-material';

import { styled } from '@mui/system';


const CustomButton = styled(Button)({
  backgroundColor: '#FFCC01',
  color: '#000',
  '&:hover': {
    backgroundColor: '#02144D',
    color: '#fff  '
  },
});


const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    console.log({user})

    if(!user) {
      navigate("/login")
    } else {
      getDetailsList()
    }
  }, [user])

  const getDetailsList = async () => {
    try {
      console.log(user?.accessToken)
      const response = await axios.get("/api/details/get-user-details", {
        headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setDetails(response.data?.data)
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const deleteDetail = async (id) => {
    try {
      setLoading(true)
      const res = await axios.delete(`/api/details/delete-details/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      })
      if (res.data?.success) {
        // alert(res.data?.message)
          getDetailsList()
      } else {
        alert("Something went wrong!")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
   }

  const columns = [
    {
      field: 'directors',
      headerName: 'Category',
      flex: 1
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar sx={{ width: 36, height: 36 }} src={params.row.image} variant="square" />
            {/* <Typography>{params.row.title}</Typography> */}
          </Box>
        )
      }
     },
    {
      field: 'trailer',
      headerName: 'Youtube Link',
      flex: 1
    },
    {
      field: 'genre',
      headerName: 'Content',
      flex: 1
    },
    {
      field: 'writers',
      headerName: 'ContentLink',
      flex: 1
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 80
    }, 
    {
        field: 'extra',
        headerName: 'Other',
        width: 80
      }, 
    {
      field: 'actions',
      headerName: "Actions",
      flex: 1,
      type: "actions",
      renderCell: (params) => {
        return (
          <Box display="flex" gap={2}>
            <IconButton 
              sx={{ background: "#2B7F75", padding: 0.5, borderRadius: 3 }}
              onClick={() => navigate(`/details/${params.row._id}`)}  
            >
              <VisibilityIcon sx={{ color: "#FFF" }} />
            </IconButton>
            <IconButton 
              sx={{ background: "#54A6FF", padding: 0.5, borderRadius: 3 }}
              onClick={() => navigate(`/edit-detail/${params.row._id}`)}   
            >
              <EditIcon  sx={{ color: "#FFF" }}/>
            </IconButton>
            <IconButton 
              sx={{ background: "#CE2C60", padding: 0.5, borderRadius: 3 }}
              onClick={() => deleteDetail(params.row._id)}
            >
              <DeleteIcon sx={{ color: "#FFF" }} />
            </IconButton>
          </Box>
        )
      }
    }
  ];

  return (
    <Container sx={{ mt: 2 }} maxWidth="lg">
        <Box display="flex" justifyContent="flex-end" >
          <CustomButton variant="contained" sx={{
            color: '#000',
            backgroundColor: '#FFCC01',
          }} onClick={() => navigate("/add-details")}>
            Add Goverment Scheme
          </CustomButton>
        </Box>
        <Typography
          py={2} 
          align="center" 
          fontWeight="bold"
          variant="h5"
          color="#FFF"
        >
            Goverment Scheme List
        </Typography>  
        {loading
          ?
            <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
          :
          <Box bgcolor="#FFFCCC" sx={{ height: "68vh", width: '100%' }}>
            <DataGrid
              sx={{
                '& .MuiDataGrid-cell' : {
                  color: "#000",
                  display: "flex",
                  alignItems: "center"
                },
                '& .MuiTablePagination-displayedRows': {
                  color: "#000"
                },
                '& .MuiTablePagination-actions' : { 
                  color: "#000"
                },
              }}
              rows={details}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6,
                  },
                },
              }}
              getRowId={(row) => row._id}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        }

    </Container>
  )
}

export default Dashboard
