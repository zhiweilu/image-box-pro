import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image_file') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: '请上传图片文件' },
        { status: 400 }
      );
    }

    // 从环境变量获取 API Key，如果没有则使用默认值
    const apiKey = process.env.REMOVE_BG_API_KEY || 'bkK3JYcPkhmypPHXKfQ4mDNc';

    // 准备发送到 remove.bg API 的表单数据
    const removeBgFormData = new FormData();
    removeBgFormData.append('image_file', imageFile);
    removeBgFormData.append('size', 'auto');

    // 调用 remove.bg API
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
      },
      body: removeBgFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Remove.bg API 错误:', errorText);
      
      // 处理常见错误
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'API Key 无效或已过期' },
          { status: 403 }
        );
      }
      
      if (response.status === 402) {
        return NextResponse.json(
          { error: 'API 配额已用完，请稍后再试' },
          { status: 402 }
        );
      }

      return NextResponse.json(
        { error: `去背景失败: ${response.statusText}` },
        { status: response.status }
      );
    }

    // 获取处理后的图片数据
    const imageBuffer = await response.arrayBuffer();

    // 返回处理后的图片
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="no-bg.png"',
      },
    });
  } catch (error) {
    console.error('处理错误:', error);
    return NextResponse.json(
      { error: '服务器处理失败，请稍后再试' },
      { status: 500 }
    );
  }
}

