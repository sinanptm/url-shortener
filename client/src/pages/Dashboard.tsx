import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "@/lib/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trash2, ExternalLink, Search } from 'lucide-react'

interface ShortenedURL {
  id: string
  originalUrl: string
  shortUrl: string
  createdAt: string
  clicks: number
}

export default function Dashboard() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [urls, setUrls] = useState<ShortenedURL[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin')
    } else {
      // Fetch user's shortened URLs
      fetchUserUrls()
    }
  }, [isAuthenticated, navigate])

  const fetchUserUrls = async () => {
    // This is a mock function. Replace with actual API call.
    const mockUrls: ShortenedURL[] = [
      { id: '1', originalUrl: 'https://example.com', shortUrl: 'http://short.url/abc123', createdAt: '2023-05-20', clicks: 10 },
      { id: '2', originalUrl: 'https://longwebsite.com/very/long/url', shortUrl: 'http://short.url/def456', createdAt: '2023-05-21', clicks: 5 },
    ]
    setUrls(mockUrls)
  }

  const handleDelete = async (id: string) => {
    // This is a mock function. Replace with actual API call.
    setUrls(urls.filter(url => url.id !== id))
  }

  const filteredUrls = urls.filter(url => 
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Shortened URLs</CardTitle>
        <CardDescription>View and manage your shortened URLs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Search className="text-gray-400" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUrls.map((url) => (
              <TableRow key={url.id}>
                <TableCell className="font-medium">{url.originalUrl}</TableCell>
                <TableCell>
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    {url.shortUrl} <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </TableCell>
                <TableCell>{url.createdAt}</TableCell>
                <TableCell>{url.clicks}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(url.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUrls.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No URLs found.</p>
        )}
      </CardContent>
    </Card>
  )
}