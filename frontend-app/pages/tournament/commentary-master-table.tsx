import React, { useState, useEffect } from 'react'

import PageTitleWithButton from 'example/components/Typography/PageTitleWithButton'
import GenericFormModal from 'example/components/Modals/GenericFormModal'
import Layout from 'example/containers/Layout'

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from '@roketid/windmill-react-ui'
import { EditIcon, TrashIcon } from 'icons'

import { api } from '../../utils/api'
import { API_ENDPOINTS } from '../../constants/api'

function Tables() {
  const [teams, setTeams] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const resultsPerPage = 10

  const fetchItems = async () => {
    try {
      const res = await api(`${API_ENDPOINTS.LOOKUPS}?type=commentary-master-table`, { method: 'GET' })
      if (res?.status === 200 && Array.isArray(res.data)) {
        setTeams(res.data)
      } else {
        console.error('Unexpected API response:', res)
      }
    } catch (error) {
      console.error('Failed to fetch teams:', error)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      await api(API_ENDPOINTS.LOOKUP_ADD_ITEM, {
        method: 'POST',
        body: { ...data, type: 'commentary-master-table' },
      })
      setIsModalOpen(false)
      await fetchItems()
    } catch (error) {
      console.error('Error adding team:', error)
    }
  }

  const totalResults = teams.length
  const paginatedData = teams.slice((page - 1) * resultsPerPage, page * resultsPerPage)

  const onPageChange = (p: number) => setPage(p)

  return (
    <Layout>
      <PageTitleWithButton
        buttonText="Add New"
        onButtonClick={() => setIsModalOpen(true)}
      >
        Batting Card
      </PageTitleWithButton>

      <GenericFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Add New Item"
        formFields={['template', 'secondary_template', 'is_wicket_template', 'extra_filter_tags', 'shot_timing']}
        onSubmit={handleFormSubmit}
      />

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Challenge #3</TableCell>
              <TableCell>Challenge #3</TableCell>
              <TableCell>Is Wicket Template</TableCell>
              <TableCell>Filter Tags</TableCell>
              <TableCell>Shot Timing</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedData.map((team) => (
              <TableRow key={team._id}>
                <TableCell>
                  {/* <span className="text-sm">{team._id}</span> */}
                  <span className="text-sm font-semibold">{team.template}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold">{team.secondary_template}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold">{team.is_wicket_template ? 'true' : 'false'}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold">{team.extra_filter_tags}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-semibold">{team?.shot_timing?.name}</span>
                </TableCell>
                <TableCell>
                  <ul className="text-sm font-semibold list-disc list-inside">
                    {team.batting_cards?.map((card: any, index: number) => (
                      <li key={index}>{card.name}</li>
                    ))}
                  </ul>
                </TableCell>
                {/* <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  )
}

export default Tables
