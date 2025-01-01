import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { FirebaseContext } from '@/context/FirebaseContext';
import WhiteboardCanvas from '@/components/WhiteboardCanvas';

const BoardPage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (!boardId) {
      // Handle case where boardId is not available
      console.error('Board ID is missing');
      return;
    }

    // Initialize or fetch board data from Firebase using boardId
    // Example: firebase.getBoardData(boardId);

  }, [boardId, firebase]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Whiteboard: {boardId}</h1>
      <WhiteboardCanvas boardId={boardId as string} />
    </div>
  );
};

export default BoardPage;