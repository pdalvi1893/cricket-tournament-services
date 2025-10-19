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

import { api } from '../../utils/api'
import { API_ENDPOINTS } from '../../constants/api'

function Tables() {
  const [teams, setTeams] = useState<{ _id: string; commentary: string; order: string; team: any }[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [dropdownFields, setDropdownFields] = useState<any[]>([])
  const [match, setMatch] = useState<{ _id: string; name: string } | null>(null)
  const resultsPerPage = 10

  const startMatch = async () => {
    try {
      const res = await api(API_ENDPOINTS.START_MATCH, { method: 'GET' });
      console.log(res.data);
      if (res?.status === 200 && res.data) {
        setMatch(res.data); // store match details, e.g., { _id, name }
      } else {
        console.error('Unexpected response when starting match:', res);
      }
    } catch (error) {
      console.error('Failed to start match:', error);
    }
  };

  const fetchDropdowns = async () => {
    try {
      const [bowlingCards, battingCards, shotTimings] = await Promise.all([
        api(`${API_ENDPOINTS.LOOKUPS}?type=bowling-cards`, { method: 'GET' }),
        api(`${API_ENDPOINTS.LOOKUPS}?type=batting-cards`, { method: 'GET' }),
        api(`${API_ENDPOINTS.LOOKUPS}?type=shot-timing`, { method: 'GET' }),
      ])

      const bowlingCardItems =
        bowlingCards?.data?.map((item: any) => ({
          id: item._id || item.id,
          value: item.name || item.value || 'Unnamed',
        })) || []

      const battingCardItems =
        battingCards?.data?.map((item: any) => ({
          id: item._id || item.id,
          value: item.name || item.value || 'Unnamed',
        })) || []

      const shortTimingItems =
        shotTimings?.data?.map((item: any) => ({
          id: item._id || item.id,
          value: item.name || item.value || 'Unnamed',
        })) || []

      setDropdownFields([
        {
          field: 'bowling_card',
          items: bowlingCardItems,
        },
        {
          field: 'batting_card',
          items: battingCardItems,
        },
        {
          field: 'shot_timing',
          items: shortTimingItems,
        },
      ])
    } catch (error) {
      console.error('Failed to fetch dropdown data:', error)
      // fallback example (optional)
      setDropdownFields([
        {
          field: 'Shot Timing',
          items: [
            { id: '1', value: 'Perfect' },
            { id: '2', value: 'Late' },
            { id: '3', value: 'Early' },
          ],
        },
      ])
    }
  }

  useEffect(() => {
    startMatch()
    //fetchTeams()
    fetchDropdowns()
  }, [])

  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      data.type = 'CHALLENGE_TWO';
      data.match_id = match?._id;

      const res = await api(API_ENDPOINTS.CHALLENGE_OUTCOME, {
        method: 'POST',
        body: data,
      })
      console.log(res.data)
      setTeams(res.data)
      setIsModalOpen(false)
      //await fetchTeams()
    } catch (error) {
      console.error('Error adding team:', error)
    }
  }

  const totalResults = teams.length
  const paginatedData = teams.slice((page - 1) * resultsPerPage, page * resultsPerPage)

  const onPageChange = (p: number) => setPage(p)

  return (
    <Layout>
      <PageTitleWithButton buttonText="Add New" onButtonClick={() => setIsModalOpen(true)}>
        Challenge #3  {match ? `🏏 ${match.name}` : 'Starting match...'}
      </PageTitleWithButton>

      <GenericFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Hit a ball!!!"
        formFields={[]}
        dropdownFields={dropdownFields}
        onSubmit={handleFormSubmit}
      />

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Commentary</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedData.map((team) => (
              <TableRow key={team._id}>
                <TableCell>
                  <span className="text-sm">{team.commentary}</span>
                </TableCell>
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
