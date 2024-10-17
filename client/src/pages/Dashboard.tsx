import { useCallback, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, ExternalLink } from 'lucide-react';
import { getUserLinks, markLinkClick, deleteLink } from '@/lib/api';
import { Link } from '@/types';
import { useAuth } from '@/lib/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Dashboard() {
  const [urls, setUrls] = useState<Link[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    console.log(isAuthenticated);
  }, [isAuthenticated]);



  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchUserUrls = useCallback(async () => {
    const links = await getUserLinks();
    setUrls(links);
  }, [getUserLinks]);

  const handleClickLink = useCallback(async (id: string) => {
    try {
      const link = await markLinkClick(id);
      window.location.href = link;
    } catch (error) {
      console.log(error);
    }
  }, [markLinkClick]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserUrls();
    }
  }, [isAuthenticated]);

  const handleDelete = useCallback(async (id: string) => {
    if (confirm("Are you sure you want to permanently remove this url 💀")) {
      setUrls(urls.filter(url => url._id !== id));
      await deleteLink(id);
    }
  }, [deleteLink]);

  const filteredUrls = urls.filter(url =>
    url.orgLink.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    url.shortLink.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

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
              <TableRow key={url._id}>
                <TableCell className="font-medium">{url.orgLink}</TableCell>
                <TableCell>
                  <a
                    href={url.shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => {
                      e.preventDefault();
                      handleClickLink(url._id);
                    }}
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    {url.shortLink} <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </TableCell>
                <TableCell>{url.createdAt}</TableCell>
                <TableCell>{url.click}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(url._id)}
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
  );
}
