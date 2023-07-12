'use client'

import { FC } from 'react'
import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid"
import { ApiRequest } from '@prisma/client'
import { useTheme } from 'next-themes'
import { ThemeProvider, createTheme } from '@mui/material'

const columnsDraft: GridColDef[] = [
    {
        field: 'col1',
        headerName: 'API Key Used',
        width: 400,
        renderHeader: (params) => {
            return (
                <strong className="font-semibold">{params.colDef.headerName}</strong>
            )
        }
    },
    { field: 'col2', headerName: 'Path', width: 250 },
    { field: 'col3', headerName: 'Recency', width: 250 },
    { field: 'col4', headerName: 'Duration', width: 150 },
    { field: 'col5', headerName: 'Status', width: 150 },
]

const columns = columnsDraft.map(col => {
    if (col.field === 'col1') {
        return col
    }
    return {
        ...col,
        renderHeader: (params: GridColumnHeaderParams<any, any, any>) => {
            return (
                <strong className="font-semibold">{params.colDef.headerName}</strong>
            )
        }
    }
})

type ModifiedUserRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
    timestamp: string
}

interface TableProps {
    userRequests: ModifiedUserRequestType<'timestamp'>[]
}

const Table: FC<TableProps> = ({ userRequests }) => {

    const { theme: applicationTheme } = useTheme()

    const theme = createTheme({
        palette: {
            mode: applicationTheme === 'light' ? 'light' : 'dark'
        }
    })

    const rows = userRequests.map((request) => ({
        id: request.id,
        col1: request.usedApiKey,
        col2: request.path,
        col3: `${request.timestamp} ago`,
        col4: `${request.duration} ms`,
        col5: request.status
    }))

    return <ThemeProvider theme={theme}>
        <DataGrid style={{ backgroundColor: applicationTheme === 'light' ? 'white' : '#152238' }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            autoHeight
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5
                    }
                }
            }}
            columns={columns}
            rows={rows}
        />
    </ThemeProvider>
}

export default Table