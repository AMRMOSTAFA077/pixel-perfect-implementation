
-- Create workspaces table
CREATE TABLE public.workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'agency')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create boards table
CREATE TABLE public.boards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Default Board',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create media_items table
CREATE TABLE public.media_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  ig_shortcode TEXT NOT NULL,
  media_type TEXT, -- 'image', 'video', 'carousel', 'reel'
  caption TEXT,
  hashtags TEXT[],
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  thumbnail_path TEXT,
  permalink TEXT,
  owner_username TEXT,
  tags TEXT[],
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, ig_shortcode)
);

-- Create board_items junction table
CREATE TABLE public.board_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  board_id UUID NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
  media_item_id UUID NOT NULL REFERENCES public.media_items(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(board_id, media_item_id)
);

-- Create shares table
CREATE TABLE public.shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  share_id TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(12), 'hex'),
  share_type TEXT NOT NULL CHECK (share_type IN ('board', 'item')),
  board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE,
  media_item_id UUID REFERENCES public.media_items(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shares ENABLE ROW LEVEL SECURITY;

-- Helper function: get workspace_id for current user
CREATE OR REPLACE FUNCTION public.get_user_workspace_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.workspaces WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Workspaces RLS
CREATE POLICY "Users can view own workspace" ON public.workspaces FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own workspace" ON public.workspaces FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own workspace" ON public.workspaces FOR UPDATE USING (user_id = auth.uid());

-- Boards RLS
CREATE POLICY "Users can view own boards" ON public.boards FOR SELECT USING (workspace_id = public.get_user_workspace_id());
CREATE POLICY "Users can insert own boards" ON public.boards FOR INSERT WITH CHECK (workspace_id = public.get_user_workspace_id());
CREATE POLICY "Users can update own boards" ON public.boards FOR UPDATE USING (workspace_id = public.get_user_workspace_id());
CREATE POLICY "Users can delete own boards" ON public.boards FOR DELETE USING (workspace_id = public.get_user_workspace_id());

-- Media items RLS
CREATE POLICY "Users can view own media" ON public.media_items FOR SELECT USING (workspace_id = public.get_user_workspace_id());
CREATE POLICY "Users can insert own media" ON public.media_items FOR INSERT WITH CHECK (workspace_id = public.get_user_workspace_id());
CREATE POLICY "Users can update own media" ON public.media_items FOR UPDATE USING (workspace_id = public.get_user_workspace_id());
CREATE POLICY "Users can delete own media" ON public.media_items FOR DELETE USING (workspace_id = public.get_user_workspace_id());

-- Board items RLS
CREATE POLICY "Users can view own board items" ON public.board_items FOR SELECT
  USING (board_id IN (SELECT id FROM public.boards WHERE workspace_id = public.get_user_workspace_id()));
CREATE POLICY "Users can insert own board items" ON public.board_items FOR INSERT
  WITH CHECK (board_id IN (SELECT id FROM public.boards WHERE workspace_id = public.get_user_workspace_id()));
CREATE POLICY "Users can delete own board items" ON public.board_items FOR DELETE
  USING (board_id IN (SELECT id FROM public.boards WHERE workspace_id = public.get_user_workspace_id()));

-- Shares RLS
CREATE POLICY "Users can view own shares" ON public.shares FOR SELECT USING (created_by = auth.uid());
CREATE POLICY "Users can create shares" ON public.shares FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can delete own shares" ON public.shares FOR DELETE USING (created_by = auth.uid());

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Attach triggers
CREATE TRIGGER set_workspaces_updated_at BEFORE UPDATE ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_boards_updated_at BEFORE UPDATE ON public.boards FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_media_items_updated_at BEFORE UPDATE ON public.media_items FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Storage bucket for thumbnails (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', false);

-- Storage policies: users can manage their own folder
CREATE POLICY "Users can upload own thumbnails" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own thumbnails" ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own thumbnails" ON storage.objects FOR DELETE
  USING (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);
